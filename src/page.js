const DataBase = require('./database/db')

const { subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes,
    convertMinutesToHours } = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday) {
        return res.render("study.html", { filters, subjects, weekdays })
    }

    const timeToMinutes = filters.time ? convertHoursToMinutes(filters.time) : 0

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes on (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '$(filters.subject)'
    `
    let queryTeste = `
        SELECT classes.*, proffys.*, class_schedule.*
        FROM proffys
        JOIN classes on (classes.proffy_id = proffys.id)
        JOIN class_schedule on (class_schedule.class_id = classes.id)
        where classes.subject = ${filters.subject}
        and class_schedule.weekday = ${filters.weekday}        
    `
    if (timeToMinutes > 0) {
        queryTeste += `
        and class_schedule.time_from <= ${timeToMinutes}
        and class_schedule.time_to > ${timeToMinutes}
        `
    }

    try {
        const db = await DataBase
        const proffys = await db.all(queryTeste)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
            proffy.time_from = convertMinutesToHours(proffy.time_from)
            proffy.time_to = convertMinutesToHours(proffy.time_to)
        })
        return res.render('study.html', { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    console.log('saveclass body:', req.body)
    const proffyValues = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValues = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await DataBase
        await createProffy(db, { proffyValues, classValues, classScheduleValues })
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
        queryString += "#modal"
        console.log('querystring: ', queryString)
        return res.redirect("/study" + queryString)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}