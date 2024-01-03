import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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