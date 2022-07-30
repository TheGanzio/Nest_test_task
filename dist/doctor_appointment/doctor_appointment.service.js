"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorAppointmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const doctors_service_1 = require("../doctors/doctors.service");
const users_service_1 = require("../users/users.service");
const doctor_appointment_schema_1 = require("./doctor_appointment-schema");
let DoctorAppointmentService = class DoctorAppointmentService {
    constructor(doctorAppointmentModel, doctorsService, usersService) {
        this.doctorAppointmentModel = doctorAppointmentModel;
        this.doctorsService = doctorsService;
        this.usersService = usersService;
    }
    async create(createDoctorAppointmentDto) {
        try {
            const user = await this.usersService.findOne(createDoctorAppointmentDto);
            const doctor = await this.doctorsService.findOne(createDoctorAppointmentDto);
            const candidateSlot = createDoctorAppointmentDto.date_time;
            let isAvailableSlot = false;
            for (const slot of doctor.slots) {
                if (slot === candidateSlot)
                    isAvailableSlot = true;
            }
            if (isAvailableSlot) {
                await this.doctorsService.deleteSlotUnit(createDoctorAppointmentDto);
                const doctorAppointment = await this.doctorAppointmentModel.create(createDoctorAppointmentDto);
                return doctorAppointment;
            }
            else {
                throw new common_1.HttpException({ message: `No free slots on ${candidateSlot}` }, 400);
            }
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, 400);
        }
    }
    findAll() {
        return this.doctorAppointmentModel.find().exec();
    }
};
DoctorAppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(doctor_appointment_schema_1.DoctorsAppointment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        doctors_service_1.DoctorsService,
        users_service_1.UsersService])
], DoctorAppointmentService);
exports.DoctorAppointmentService = DoctorAppointmentService;
//# sourceMappingURL=doctor_appointment.service.js.map