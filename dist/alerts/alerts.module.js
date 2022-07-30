"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsModule = void 0;
const common_1 = require("@nestjs/common");
const doctors_module_1 = require("../doctors/doctors.module");
const doctor_appointment_module_1 = require("../doctor_appointment/doctor_appointment.module");
const files_module_1 = require("../files/files.module");
const users_module_1 = require("../users/users.module");
const alerts_controller_1 = require("./alerts.controller");
const alerts_service_1 = require("./alerts.service");
const schedule_1 = require("@nestjs/schedule");
let AlertsModule = class AlertsModule {
};
AlertsModule = __decorate([
    (0, common_1.Module)({
        controllers: [alerts_controller_1.AlertsController],
        providers: [alerts_service_1.AlertsService],
        imports: [
            doctors_module_1.DoctorsModule,
            users_module_1.UsersModule,
            doctor_appointment_module_1.DoctorAppointmentModule,
            files_module_1.FilesModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
    })
], AlertsModule);
exports.AlertsModule = AlertsModule;
//# sourceMappingURL=alerts.module.js.map