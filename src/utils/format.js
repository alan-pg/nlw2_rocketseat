const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time) {
    const [ hour, minutes ] = time.split(":")
    return (parseInt(hour) * 60) + parseInt(minutes)
}

function convertMinutesToHours(time) {
    return `${Math.floor(time / 60)}:${time % 60}`
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes,
    convertMinutesToHours
}

