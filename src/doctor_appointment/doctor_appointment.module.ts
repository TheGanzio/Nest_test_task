import { Module } from '@nestjs/common';
import { DoctorAppointmentService } from './doctor_appointment.service';
import { DoctorAppointmentController } from './doctor_appointment.controller';
import {
  DoctorsAppointment,
  DoctorsAppointmentSchema,
} from './doctor_appointment-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DoctorAppointmentController],
  providers: [DoctorAppointmentService],
  imports: [
    MongooseModule.forFeature([
      { name: DoctorsAppointment.name, schema: DoctorsAppointmentSchema },
    ]),
    DoctorsModule,
    UsersModule,
  ],
  exports: [DoctorAppointmentService],
})
export class DoctorAppointmentModule {}
