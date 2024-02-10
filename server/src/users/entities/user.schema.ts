import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Chat } from 'src/chats/entities/chat.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop()
  img: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Chat.name }] })
  chats: Chat[];
}

export const UserSchema = SchemaFactory.createForClass(User);
