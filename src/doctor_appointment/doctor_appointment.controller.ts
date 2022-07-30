import { Controller, Get, Post, Body } from '@nestjs/common';
import { DoctorAppointmentService } from './doctor_appointment.service';
import { CreateDoctorAppointmentDto } from './dto/create-doctor_appointment.dto';

@Controller('doctor-appointment')
export class DoctorAppointmentController {
  constructor(
    private readonly doctorAppointmentService: DoctorAppointmentService,
  ) {}

  @Post()
  create(@Body() createDoctorAppointmentDto: CreateDoctorAppointmentDto) {
    return this.doctorAppointmentService.create(createDoctorAppointmentDto);
  }

  @Get()
  findAll() {
    return this.doctorAppointmentService.findAll();
  }
}
