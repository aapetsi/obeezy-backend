require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

// Connect to MonogoDB
connectDB()

// Express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Cors middleware
app.use(cors())

// routers
const userRouter = require('./routes/userRouter')

// Use routes
app.use('/api/users', userRouter)

module.exports = app
