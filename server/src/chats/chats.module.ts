import { Module, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { UsersModule } from 'src/users/users.module';
import { ChatController } from './chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.schema';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    UsersModule,
    forwardRef(() => MessagesModule),
  ],
  exports: [ChatsService],
  providers: [ChatsService],
  controllers: [ChatController],
})
export class ChatModule {}
