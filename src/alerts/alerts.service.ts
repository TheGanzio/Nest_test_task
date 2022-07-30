import { Injectable } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { DoctorAppointmentService } from 'src/doctor_appointment/doctor_appointment.service';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AlertsService {
    constructor(
        private doctorsService: DoctorsService,
        private usersService: UsersService,
        private filesService: FilesService,
        private doctorAppointmentService: DoctorAppointmentService,
    ) { }

    @Cron('10 * * * * *')
    async checkAppointment() {
        const currentTimestamp = Date.now();
        const currentDate = new Date(currentTimestamp);
        const currentDateParse =
            currentDate.getDate() +
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
            if (
                doctorAppointment.date_time &&
                doctorAppointment.date_time.includes(' ')
            ) {
                const doctorAppointmentDate = doctorAppointment.date_time.split(' ')[0];
                const doctorAppointmentDateTime =
                    doctorAppointment.date_time.split(' ')[1];

                const mm = doctorAppointmentDate.split('.')[1];
                const dd = doctorAppointmentDate.split('.')[0];
                const yyyy = doctorAppointmentDate.split('.')[2];

                const doctorAppointmentTimestamp = Date.parse(
                    mm + '.' + dd + '.' + yyyy + ' ' + doctorAppointmentDateTime,
                );

                if (
                    !doctorAppointment.alertTwoHours &&
                    (doctorAppointmentTimestamp - currentTimestamp) <= twoHours
                ) {
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
                } else if (
                    !doctorAppointment.alertOneDay &&
                    (doctorAppointmentTimestamp - currentTimestamp) <= oneDay
                ) {
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
}
