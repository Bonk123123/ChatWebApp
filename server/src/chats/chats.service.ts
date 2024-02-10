import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateChatsDto } from './dto/create-chats.dto';
import { UpdateChatsDto } from './dto/update-chats.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './entities/chat.schema';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class ChatsService {
  private logger: Logger = new Logger('Chats Service');

  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    private usersService: UsersService,
    @Inject(forwardRef(() => MessagesService))
    private messagesService: MessagesService,
  ) {}

  async create(createChatsDto: CreateChatsDto, img: Express.Multer.File) {
    // const usersObjectId =
    //   typeof createChatsDto.usersId === 'string'
    //     ? new mongoose.Types.ObjectId(createChatsDto.usersId)
    //     : createChatsDto.usersId.map(
    //         (userId) => new mongoose.Types.ObjectId(userId),
    //       );

    // const chatExist = await this.chatModel.findOne({
    //   'chat_participants.user': usersObjectId,
    // });

    const chats = await this.chatModel.find();

    const chatExist = chats.filter((chat) =>
      typeof createChatsDto.usersId === 'string'
        ? chat.chat_participants.every(
            (element) => element.user.toString() === createChatsDto.usersId,
          )
        : chat.chat_participants.length === createChatsDto.usersId.length &&
          chat.chat_participants.every(
            (element, index) =>
              element.user.toString() === createChatsDto.usersId[index],
          ),
    );

    console.log(chatExist);
    if (chatExist.length !== 0) return chatExist;

    const createdChat = new this.chatModel({
      chat_name: createChatsDto.name ? createChatsDto.name : '',
      chat_img: img && img.path ? img.path : '',
      chat_participants:
        typeof createChatsDto.usersId === 'string'
          ? {
              user: new mongoose.Types.ObjectId(createChatsDto.usersId),
              userSocketId: null,
            }
          : createChatsDto.usersId.map((id) => ({
              user: new mongoose.Types.ObjectId(id),
              userSocketId: null,
            })),
    });

    await createdChat.save();

    const users = await this.usersService.findById(createChatsDto.usersId);

    users.forEach(async (user) => {
      user.chats.push(createdChat);
      await user.save();
    });

    this.logger.log(
      'chat was created: ' + createdChat._id + ' name:' + createdChat.chat_name,
    );

    return createdChat;
  }

  async addChatToUser(userId: string, chatId: string) {
    const user = await this.usersService.findOneById(userId);

    if (!user) throw new NotFoundException('no such user found');

    const chat = await this.chatModel.findById(chatId);

    if (!chat) throw new NotFoundException('no such chat found');

    user.chats = [...user.chats, chat];

    return await user.save();
  }

  async findAllUserChats(userId: string) {
    const chats = await this.chatModel.find({
      'chat_participants.user': new mongoose.Types.ObjectId(userId),
    });

    return chats;
  }

  async findAllUserChatsClient(
    userId: string,
    searchParam: string,
    skip: number,
    limit: number,
  ) {
    let chats = await this.chatModel
      .find({
        $and: [
          { 'chat_participants.user': new mongoose.Types.ObjectId(userId) },
          { chat_name: { $regex: '.*' + searchParam + '.*' } },
        ],
      })
      .skip(skip)
      .limit(limit)
      .exec();

    let chatsClient = [];

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].chat_participants.length === 2) {
        const user2Id = chats[i].chat_participants[1].user.toString();

        const user1Id = chats[i].chat_participants[0].user.toString();

        const user2 = await this.usersService.findOneById(
          user1Id === userId ? user2Id : user1Id,
        );

        chats[i].chat_name = user2.username;
        chats[i].chat_img = user2.img;
      }

      if (chats[i].messages.length !== 0) {
        const lastMessageId =
          chats[i].messages[chats[i].messages.length - 1].toString();

        const lastMessage = await this.messagesService.findOne(lastMessageId);
        chatsClient.push({
          ...chats[i].toObject(),
          lastMessage: lastMessage.message,
        });
      } else {
        chatsClient.push({
          ...chats[i].toObject(),
          lastMessage: 'write message',
        });
      }
    }
    return chatsClient;
  }

  async findOne(chatId: string) {
    if (!chatId || !chatId.match(/^[0-9a-fA-F]{24}$/)) return;
    return await this.chatModel.findById(chatId);
  }

  async findOneClient(chatId: string, userId: string) {
    if (!userId || !chatId.match(/^[0-9a-fA-F]{24}$/)) return [];
    let chatClient;
    if (!chatId || !chatId.match(/^[0-9a-fA-F]{24}$/)) return [];
    const chat = await this.chatModel.findById(chatId);

    if (chat.chat_participants.length === 2) {
      const user2Id = chat.chat_participants[1].user.toString();

      const user1Id = chat.chat_participants[0].user.toString();

      const user2 = await this.usersService.findOneById(
        user1Id === userId ? user2Id : user1Id,
      );

      chat.chat_name = user2.username;
      chat.chat_img = user2.img;
    }

    if (chat.messages.length !== 0) {
      const lastMessageId = chat.messages[chat.messages.length - 1].toString();

      const lastMessage = await this.messagesService.findOne(lastMessageId);
      chatClient = {
        ...chat.toObject(),
        lastMessage: lastMessage.message,
      };
    } else {
      chatClient = {
        ...chat.toObject(),
        lastMessage: 'write message',
      };
    }
    return chatClient;
  }

  async updateUserStateInChats(userId: string, clientId: string | null) {
    const chats = await this.findAllUserChats(userId);

    chats.forEach(async (chat) => {
      chat.chat_participants.find(
        (participant) => participant.user._id.toString() === userId.toString(),
      ).userSocketId = clientId;

      await chat.save();
    });
  }

  async update(
    chatId: string,
    updateChatsDto: UpdateChatsDto,
    img: Express.Multer.File,
  ) {
    const chat = await this.findOne(chatId);

    if (img) {
      chat.chat_img = img && img.path ? img.path : '';
    }

    if (!chat) throw new NotFoundException('such chat not exist');

    if (updateChatsDto.usersId) {
      const newChatUsersId = await this.usersService.findById(
        updateChatsDto.usersId,
      );

      const usersIdWithSocketId = newChatUsersId.map((userId) => ({
        user: userId,
        userSocketId: null,
      }));

      chat.chat_participants.concat(usersIdWithSocketId);
    }

    if (updateChatsDto.name) {
      chat.chat_name = updateChatsDto.name;
    }

    return await chat.save();
  }

  async remove(chatId: string) {
    const result = await this.chatModel.findByIdAndDelete(chatId).exec();

    if (!result) {
      throw new NotFoundException();
    }

    this.logger.log('chat was deleted', result._id, result.chat_name);
  }
}
