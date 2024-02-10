import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { ChatsService } from 'src/chats/chats.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private messagesService: MessagesService,
    private chatsService: ChatsService,
  ) {}

  @SubscribeMessage('SendMessage')
  async handleSendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const message = await this.messagesService.create(createMessageDto);

    const chat = await this.chatsService.findOne(createMessageDto.chatId);

    const popMessage = await message.populate('user');

    popMessage.user.password = undefined;

    chat.chat_participants?.forEach((participant) => {
      socket.to(participant.userSocketId).emit('ReceiveMessage', popMessage);
    });

  }

  @SubscribeMessage('Typing')
  async handleTyping(
    @MessageBody() chatId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const chat = await this.chatsService.findOne(chatId);

    const user = await this.messagesService.getUserFromSocket(socket);

    chat.chat_participants?.forEach((participant) => {
      socket.to(participant.userSocketId).emit('Typing', user.username);
    });
  }

  @SubscribeMessage('GetAllMessages')
  async handleGetAllMessage(
    @MessageBody() chatId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const messages = await this.messagesService.findAllMessage(chatId);

    socket.emit('ReceiveAllMessages', messages);
  }

  @SubscribeMessage('UpdateMessage')
  async handleUpdateMessage(
    @MessageBody()
    updateMessageDto: { chatId: string; messageId: string; message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const message = await this.messagesService.update(
      updateMessageDto.messageId,
      updateMessageDto,
    );

    const chat = await this.chatsService.findOne(updateMessageDto.chatId);

    chat.chat_participants.forEach((participant) => {
      socket
        .to(participant.userSocketId)
        .emit('ReceiveUpdatedMessage', message);
    });
  }

  @SubscribeMessage('RemoveMessage')
  async handleRemoveMessage(
    @MessageBody() removeMessagesDto: { chatId: string; messageId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    await this.messagesService.remove(removeMessagesDto.messageId);

    const chat = await this.chatsService.findOne(removeMessagesDto.chatId);

    chat.chat_participants.forEach((participant) => {
      socket
        .to(participant.userSocketId)
        .emit('ReceiveRemovedMessageId', removeMessagesDto.messageId);
    });
  }

  async handleConnection(socket: Socket) {
    const user = await this.messagesService.getUserFromSocket(socket);
    await this.chatsService.updateUserStateInChats(user._id, socket.id);
  }

  async handleDisconnect(socket: Socket) {
    const user = await this.messagesService.getUserFromSocket(socket);
    await this.chatsService.updateUserStateInChats(user._id, null);
  }
}
