import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorsAppointmentDocument = DoctorsAppointment & Document;

@Schema()
export class DoctorsAppointment {
  @Prop()
  userId: string;

  @Prop()
  doctorId: string;

  @Prop()
  date_time: string;

  @Prop({ default: false })
  alertTwoHours: boolean;

  @Prop({ default: false })
  alertOneDay: boolean;
}

export const DoctorsAppointmentSchema =
  SchemaFactory.createForClass(DoctorsAppointment);
