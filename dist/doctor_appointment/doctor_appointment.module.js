"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorAppointmentModule = void 0;
const common_1 = require("@nestjs/common");
const doctor_appointment_service_1 = require("./doctor_appointment.service");
const doctor_appointment_controller_1 = require("./doctor_appointment.controller");
const doctor_appointment_schema_1 = require("./doctor_appointment-schema");
const mongoose_1 = require("@nestjs/mongoose");
const doctors_module_1 = require("../doctors/doctors.module");
const users_module_1 = require("../users/users.module");
let DoctorAppointmentModule = class DoctorAppointmentModule {
};
DoctorAppointmentModule = __decorate([
    (0, common_1.Module)({
        controllers: [doctor_appointment_controller_1.DoctorAppointmentController],
        providers: [doctor_appointment_service_1.DoctorAppointmentService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: doctor_appointment_schema_1.DoctorsAppointment.name, schema: doctor_appointment_schema_1.DoctorsAppointmentSchema },
            ]),
            doctors_module_1.DoctorsModule,
            users_module_1.UsersModule,
        ],
        exports: [doctor_appointment_service_1.DoctorAppointmentService],
    })
], DoctorAppointmentModule);
exports.DoctorAppointmentModule = DoctorAppointmentModule;
//# sourceMappingURL=doctor_appointment.module.js.map