import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorsService } from 'src/doctors/doctors.service';
import { UsersService } from 'src/users/users.service';
import {
  DoctorsAppointment,
  DoctorsAppointmentDocument,
} from './doctor_appointment-schema';
import { CreateDoctorAppointmentDto } from './dto/create-doctor_appointment.dto';

@Injectable()
export class DoctorAppointmentService {
  constructor(
    @InjectModel(DoctorsAppointment.name)
    private doctorAppointmentModel: Model<DoctorsAppointmentDocument>,
    private doctorsService: DoctorsService,
    private usersService: UsersService,
  ) {}

  async create(createDoctorAppointmentDto: CreateDoctorAppointmentDto) {
    try {
      const user = await this.usersService.findOne(createDoctorAppointmentDto);
      const doctor = await this.doctorsService.findOne(
        createDoctorAppointmentDto,
      );

      const candidateSlot = createDoctorAppointmentDto.date_time;
      let isAvailableSlot = false;

      for (const slot of doctor.slots) {
        if (slot === candidateSlot) isAvailableSlot = true;
      }

      if (isAvailableSlot) {
        // Delete slot from Doctor's slot array
        await this.doctorsService.deleteSlotUnit(createDoctorAppointmentDto);
        // Create new Doctor Appointment
        const doctorAppointment = await this.doctorAppointmentModel.create(
          createDoctorAppointmentDto,
        );
        return doctorAppointment;
      } else {
        throw new HttpException(
          { message: `No free slots on ${candidateSlot}` },
          400,
        );
      }
    } catch (error) {
      throw new HttpException({ message: error.message }, 400);
    }
  }

  findAll() {
    return this.doctorAppointmentModel.find().exec();
  }
}
