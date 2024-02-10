import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.schema';
import mongoose, { Model } from 'mongoose';
import { ChatsService } from 'src/chats/chats.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @Inject(forwardRef(() => ChatsService))
    private chatsService: ChatsService,
    private authenticationService: AuthenticationService,
  ) {}

  async getUserFromSocket(socket: Socket) {
    // if (!socket.handshake.headers.cookie) socket.disconnect();
    // throw new WsException('No cookie ma brother');
    const token = socket.handshake.headers.authorization;

    const user =
      await this.authenticationService.getUserFromAuthenticationToken(token);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async create(createMessageDto: CreateMessageDto) {
    const message = new this.messageModel({
      user: createMessageDto.userId,
      message: createMessageDto.message,
    });

    await message.save();

    const chat = await this.chatsService.findOne(createMessageDto.chatId);

    if (
      !chat.chat_participants
        .map((user) => user.user._id.toString())
        .includes(createMessageDto.userId)
    ) {
      throw new HttpException(
        'No such user in this group',
        HttpStatus.BAD_REQUEST,
      );
    }

    chat.messages.push(message);

    await chat.save();

    return message;
  }

  async findAllMessage(chatId: string) {
    const chat = await this.chatsService.findOne(chatId);

    if(!chat) return

    const popChat = await chat.populate({
      path: 'messages',
      populate: [{ path: 'user' }],
    });

    popChat.messages.forEach((message) => {
      message.user.password = undefined;
    });

    return popChat.messages;
  }

  async findOne(messageId: string) {
    return await this.messageModel.findById(messageId).exec();
  }

  async update(messageId: string, updateMessageDto: UpdateMessageDto) {
    return await this.messageModel
      .findByIdAndUpdate(messageId, {
        message: updateMessageDto.message,
      })
      .exec();
  }

  async remove(messageId: string) {
    const result = await this.messageModel.findByIdAndDelete(messageId).exec();

    if (!result) {
      throw new NotFoundException();
    }
  }
}
