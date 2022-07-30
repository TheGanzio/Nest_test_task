import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { DoctorAppointmentModule } from './doctor_appointment/doctor_appointment.module';
import { AlertsModule } from './alerts/alerts.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nestjs'),
    UsersModule,
    DoctorsModule,
    DoctorAppointmentModule,
    AlertsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
