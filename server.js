const express = require('express')
const cors = require('cors')

const app = express()

// Express middleware
app.use(express.urlencoded({ extended: false }))

// Cors middleware
app.use(cors)

module.exports = app
