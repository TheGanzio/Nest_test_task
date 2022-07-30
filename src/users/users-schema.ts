import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;
}

export const UsersSchema = SchemaFactory.createForClass(User);
