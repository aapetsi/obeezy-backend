const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// @route POST api/user/login
// @desc Login user
// @access Public
router.post('/login', userController.login)

module.exports = router
