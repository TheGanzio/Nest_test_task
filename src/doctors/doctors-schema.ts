import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorsDocument = Doctor & Document;

@Schema()
export class Doctor {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  spec: string;

  @Prop()
  slots: string[];
}

export const DoctorsSchema = SchemaFactory.createForClass(Doctor);
