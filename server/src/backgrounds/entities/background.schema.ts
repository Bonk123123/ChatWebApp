import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from 'src/users/entities/user.schema';

export type BackgroundDocument = Background & Document;

@Schema()
export class Background {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ default: '' })
  img: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BackgroundSchema = SchemaFactory.createForClass(Background);
