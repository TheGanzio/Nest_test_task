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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const doctors_service_1 = require("../doctors/doctors.service");
const doctor_appointment_service_1 = require("../doctor_appointment/doctor_appointment.service");
const files_service_1 = require("../files/files.service");
const users_service_1 = require("../users/users.service");
const schedule_1 = require("@nestjs/schedule");
let AlertsService = class AlertsService {
    constructor(doctorsService, usersService, filesService, doctorAppointmentService) {
        this.doctorsService = doctorsService;
        this.usersService = usersService;
        this.filesService = filesService;
        this.doctorAppointmentService = doctorAppointmentService;
    }
    async checkAppointment() {
        const currentTimestamp = Date.now();
        const currentDate = new Date(currentTimestamp);
        const currentDateParse = currentDate.getDate() +
            '/' +
            (currentDate.getMonth() + 1) +
            '/' +
            currentDate.getFullYear() +
            ' ' +
            currentDate.getHours() +
            ':' +
            currentDate.getMinutes() +
            ':' +
            currentDate.getSeconds();
        const twoHours = 2 * 3600000;
        const oneDay = 24 * 3600000;
        const doctorAppointments = await this.doctorAppointmentService.findAll();
        for (const doctorAppointment of doctorAppointments) {
            if (doctorAppointment.date_time &&
                doctorAppointment.date_time.includes(' ')) {
                const doctorAppointmentDate = doctorAppointment.date_time.split(' ')[0];
                const doctorAppointmentDateTime = doctorAppointment.date_time.split(' ')[1];
                const mm = doctorAppointmentDate.split('.')[1];
                const dd = doctorAppointmentDate.split('.')[0];
                const yyyy = doctorAppointmentDate.split('.')[2];
                const doctorAppointmentTimestamp = Date.parse(mm + '.' + dd + '.' + yyyy + ' ' + doctorAppointmentDateTime);
                if (!doctorAppointment.alertTwoHours &&
                    (doctorAppointmentTimestamp - currentTimestamp) <= twoHours) {
                    const user = await this.usersService.findOne({
                        userId: doctorAppointment.userId,
                    });
                    const doctor = await this.doctorsService.findOne({
                        doctorId: doctorAppointment.doctorId,
                    });
                    const message = `${currentDateParse} | Привет ${user.name}! Вам через 2 часа к ${doctor.spec} в ${doctorAppointment.date_time}!`;
                    console.log(message);
                    await this.filesService.writeToFile(message);
                    doctorAppointment.alertTwoHours = true;
                    await doctorAppointment.save();
                }
                else if (!doctorAppointment.alertOneDay &&
                    (doctorAppointmentTimestamp - currentTimestamp) <= oneDay) {
                    const user = await this.usersService.findOne({
                        userId: doctorAppointment.userId,
                    });
                    const doctor = await this.doctorsService.findOne({
                        doctorId: doctorAppointment.doctorId,
                    });
                    const message = `${currentDateParse} | Привет ${user.name}! Напоминаем что вы записаны к ${doctor.spec} завтра в ${doctorAppointment.date_time}!`;
                    console.log(message);
                    await this.filesService.writeToFile(message);
                    doctorAppointment.alertOneDay = true;
                    await doctorAppointment.save();
                }
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('10 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertsService.prototype, "checkAppointment", null);
AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [doctors_service_1.DoctorsService,
        users_service_1.UsersService,
        files_service_1.FilesService,
        doctor_appointment_service_1.DoctorAppointmentService])
], AlertsService);
exports.AlertsService = AlertsService;
//# sourceMappingURL=alerts.service.js.map