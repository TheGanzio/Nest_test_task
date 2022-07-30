import { Module } from '@nestjs/common';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { DoctorAppointmentModule } from 'src/doctor_appointment/doctor_appointment.module';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [AlertsController],
  providers: [AlertsService],
  imports: [
    DoctorsModule,
    UsersModule,
    DoctorAppointmentModule,
    FilesModule,
    ScheduleModule.forRoot(),
  ],
})
export class AlertsModule {}
