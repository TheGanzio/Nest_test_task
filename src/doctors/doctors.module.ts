import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorsSchema } from './doctors-schema';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorsSchema }]),
  ],
  exports: [DoctorsService],
})
export class DoctorsModule {}
