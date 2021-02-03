module.exports = async function(db, {proffyValues, classValues, classScheduleValues}){
    
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValues.name}",
            "${proffyValues.avatar}",
            "${proffyValues.whatsapp}",
            "${proffyValues.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValues.subject}",
                "${classValues.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    await Promise.all(insertedAllClassesScheduleValues)
} 