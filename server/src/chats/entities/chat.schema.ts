import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from 'src/users/entities/user.schema';
import { Message } from '../../messages/entities/message.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ default: '' })
  chat_name: string;

  @Prop({ default: '' })
  chat_img: string;

  @Prop({
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        userSocketId: { type: String, default: null },
      },
    ],
  })
  chat_participants: { user: User; userSocketId: string }[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Message.name }],
    default: [],
  })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
