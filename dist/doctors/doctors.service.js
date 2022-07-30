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
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const doctors_schema_1 = require("./doctors-schema");
const doctorsPrefill = require("./template_doctors_data");
let DoctorsService = class DoctorsService {
    constructor(doctorModel) {
        this.doctorModel = doctorModel;
    }
    async create(createDoctorDto) {
        const doctor = new this.doctorModel(createDoctorDto);
        return doctor.save();
    }
    async update(updateDoctorDto) {
        try {
            const doctor = await this.doctorModel.findById(updateDoctorDto.doctorId);
            doctor.slots.push(updateDoctorDto.addSlotUnit);
            await doctor.save();
            return doctor;
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Doctor not found' }, 400);
        }
    }
    async findAll() {
        return this.doctorModel.find().exec();
    }
    async findOne(getDoctorByIdDto) {
        try {
            const doctor = await this.doctorModel.findOne({
                _id: getDoctorByIdDto.doctorId,
                include: { all: true },
            });
            return doctor;
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Doctor not found' }, 400);
        }
    }
    async deleteSlotUnit(dto) {
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
        }
        catch (error) {
            console.log(error);
            return 'Doctors not prefilled\n';
        }
    }
};
DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(doctors_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DoctorsService);
exports.DoctorsService = DoctorsService;
//# sourceMappingURL=doctors.service.js.map