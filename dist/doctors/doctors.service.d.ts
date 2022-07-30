import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor, DoctorsDocument } from './doctors-schema';
import { GetDoctorByIdDto } from './dto/get-doctor-by-id.dto';
export declare class DoctorsService {
    private doctorModel;
    constructor(doctorModel: Model<DoctorsDocument>);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    update(updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    findOne(getDoctorByIdDto: GetDoctorByIdDto): Promise<Doctor>;
    deleteSlotUnit(dto: any): Promise<Doctor>;
    prefillData(): Promise<"Doctors successfully prefilled\n" | "Doctors not prefilled\n">;
}
