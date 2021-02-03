const DataBase = require('../database/db')
const createProffy = require('../database/createProffy')
const faker = require('faker');
faker.locale = "pt_BR"
const { subjects,
    weekdays,
    convertHoursToMinutes } = require('../utils/format')

const total_subjects = subjects.length
let count = 0

function createFake(db) {

    const proffyValues = {
        name: faker.name.findName(),
        avatar: faker.image.animals(),
        whatsapp: faker.phone.phoneNumber(),
        bio: faker.lorem.paragraph()
    }

    const classValues = {
        subject: faker.random.number({ min: 1, max: total_subjects}),
        cost: faker.finance.amount(5, 100, 2)
    }
    const h = faker.random.number({ min: 6, max: 18 })
    const m = faker.random.arrayElement([00, 10, 20, 30, 40, 50])
    const classScheduleValues = [
        {
            weekday: faker.random.number({min:0, max:6}),
            time_from: convertHoursToMinutes(`${h}:${m}`),
            time_to: convertHoursToMinutes(`${faker.random.number({ min: h + 2, max: 23 })}:${m}`)
        }
    ]
    
    try {
        createProffy(db, { proffyValues, classValues, classScheduleValues }).then(() => {
            count++
            console.log(`${count} CREATED: ${proffyValues.name} weekday: ${weekdays[classScheduleValues[0].weekday]} subject: ${subjects[classValues.subject - 1]}`)
        })

    } catch (error) {
        console.log(error)
    }
}

console.log('CREATING...')
DataBase.then((db) => {
    for(let i =0; i <= 100; i++){
        createFake(db)
    }
}).catch((error) => console.log(error))