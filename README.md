To run app use docker-compose

-----------------------------------------------------------------------------------------------------

To Prefill data please use "npm run prefill" or 
make 2 POST requests to http://localhost:3000/doctors/prefill and http://localhost:3000/users/prefill

-----------------------------------------------------------------------------------------------------

To Get all doctors make GET request to http://localhost:3000/doctors

-----------------------------------------------------------------------------------------------------

To Create doctor make POST request to http://localhost:3000/doctors
Body example:
{
    "name": "John NestJS",
    "spec": "Developer",
    "slots": [
        "30.07.2022 15:00",
        "31.07.2022 17:00",
        "01.08.2022 10:00",
        "01.08.2022 12:00"
    ]
}

-----------------------------------------------------------------------------------------------------

To Get all users make GET request to http://localhost:3000/users

-----------------------------------------------------------------------------------------------------

To Create user make POST request to http://localhost:3000/users
Example body:
{
    "name": "Gable Newell",
    "phone": "0387214568"
}

-----------------------------------------------------------------------------------------------------

To Add slot for some Doctor make PATCH request to http://localhost:3000/doctors
{
    "doctorId": "62e58716e46c9ed9307dee8e",
    "addSlotUnit": "31.07.2022 09:30"
}

-----------------------------------------------------------------------------------------------------

alerts.log is exists in dist/alerts.log/alerts.log
For user alerts I use @Cron (every minute call alertService)
For prefilling data I created template_users_data.js and template_doctor_data.js with random data,
And get example data from here.