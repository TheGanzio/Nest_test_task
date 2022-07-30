import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { GetDoctorByIdDto } from './dto/get-doctor-by-id.dto';
import { DeleteSlotDto } from './dto/delete-slot.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Patch()
  update(@Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(updateDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') dto: GetDoctorByIdDto) {
    return this.doctorsService.findOne(dto);
  }

  @Delete()
  deleteSlotUnit(@Body() dto: DeleteSlotDto) {
    return this.doctorsService.deleteSlotUnit(dto);
  }

  @Post('/prefill')
  prefillData() {
    return this.doctorsService.prefillData();
  }
}
