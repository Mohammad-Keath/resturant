require('dotenv').config()
const port = process.env.PORT
const { db } = require('./src/models/index')
const {start} = require('./src/server')
db.sync({ force: false, alter: true }).then(()=>{
    start(port)
})