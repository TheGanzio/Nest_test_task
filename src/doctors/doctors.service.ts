import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor, DoctorsDocument } from './doctors-schema';
import { GetDoctorByIdDto } from './dto/get-doctor-by-id.dto';
import * as doctorsPrefill from './template_doctors_data';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorsDocument>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = new this.doctorModel(createDoctorDto);
    return doctor.save();
  }

  async update(updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    try {
      const doctor = await this.doctorModel.findById(updateDoctorDto.doctorId);
      doctor.slots.push(updateDoctorDto.addSlotUnit);
      await doctor.save();
      return doctor;
    } catch (error) {
      throw new HttpException({ message: 'Doctor not found' }, 400);
    }
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async findOne(getDoctorByIdDto: GetDoctorByIdDto): Promise<Doctor> {
    try {
      const doctor = await this.doctorModel.findOne({
        _id: getDoctorByIdDto.doctorId,
        include: { all: true },
      });
      return doctor;
    } catch (error) {
      throw new HttpException({ message: 'Doctor not found' }, 400);
    }
  }

  async deleteSlotUnit(dto): Promise<Doctor> {
    const slotUnit = dto.date_time;
    const doctorId = dto.doctorId;
    const doctor = await this.doctorModel.findOne({
      _id: doctorId,
      include: { all: true },
    });
    const allSlots = doctor.slots;

    if (doctor && allSlots) {
      for (const slot of allSlots) {
        if (slotUnit === slot) {
          const index = allSlots.indexOf(slotUnit);
          if (index > -1) {
            allSlots.splice(index, 1);
          }
        }
      }
    }

    doctor.slots = allSlots;
    await doctor.save();

    return doctor;
  }

  async prefillData() {
    try {
      await this.doctorModel.insertMany(doctorsPrefill);
      return 'Doctors successfully prefilled\n';
    } catch (error) {
      console.log(error);
      return 'Doctors not prefilled\n';
    }
  }
}
