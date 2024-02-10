import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from 'src/users/entities/user.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: '' })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
