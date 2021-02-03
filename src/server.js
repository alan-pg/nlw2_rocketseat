const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

const { 
    pageLanding, 
    pageStudy, 
    pageGiveClasses,
    saveClasses
} = require('./page')

nunjucks.configure('src/views',{
    express: server,
    noCache: true,

})

server
.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(process.env.PORT || 5500)