import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ChatModule } from 'src/chats/chats.module';
import { MessagesGateway } from './messages.gateway';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { Message, MessageSchema } from './entities/message.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    forwardRef(() => ChatModule),
    AuthenticationModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  exports: [MessagesService],
  controllers: [],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
