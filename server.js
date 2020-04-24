const express = require('express')
const cors = require('cors')

const app = express()

// Express middleware
app.use(express.urlencoded({ extended: false }))

// Cors middleware
app.use(cors())

// routers
const userRouter = require('./routes/userRouter')

// Use routes
app.use('/api/users', userRouter)

module.exports = app
