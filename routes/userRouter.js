const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// @route POST api/users/login
// @desc Login user
// @access Public
router.post('/login', userController.login)

// @route POST api/users/register
// @desc Register a new user
// @access Public
router.post('/register', userController.register)

module.exports = router
