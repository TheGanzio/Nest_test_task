import { DoctorsService } from 'src/doctors/doctors.service';
import { DoctorAppointmentService } from 'src/doctor_appointment/doctor_appointment.service';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
export declare class AlertsService {
    private doctorsService;
    private usersService;
    private filesService;
    private doctorAppointmentService;
    constructor(doctorsService: DoctorsService, usersService: UsersService, filesService: FilesService, doctorAppointmentService: DoctorAppointmentService);
    checkAppointment(): Promise<void>;
}
