import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { GetDoctorByIdDto } from './dto/get-doctor-by-id.dto';
import { DeleteSlotDto } from './dto/delete-slot.dto';
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    create(createDoctorDto: CreateDoctorDto): Promise<import("./doctors-schema").Doctor>;
    update(updateDoctorDto: UpdateDoctorDto): Promise<import("./doctors-schema").Doctor>;
    findAll(): Promise<import("./doctors-schema").Doctor[]>;
    findOne(dto: GetDoctorByIdDto): Promise<import("./doctors-schema").Doctor>;
    deleteSlotUnit(dto: DeleteSlotDto): Promise<import("./doctors-schema").Doctor>;
    prefillData(): Promise<"Doctors successfully prefilled\n" | "Doctors not prefilled\n">;
}
