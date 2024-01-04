import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/user-route.js'
// import {test} from './controllers/user-controller.js'

dotenv.config()

// const mongoose= require('mongoose')



mongoose.connect(process.env.MONGO).then(() => {
    console.log("Mongodb is added great")
})
.catch((err) => {
    console.log(err)
})
const app =express()

app.listen(3000, () => {
    console.log('server is running on port 3000!! wow')
})

// req is the data sent by client(user), res is the sent by the server
// app.get('/test', (req, res) => {
//     res.send('Test AP2I')
// })

app.use("/api/user", router)