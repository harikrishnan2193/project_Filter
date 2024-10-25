const express = require('express')
const router = new express.Router()

const authController = require('../Controllers/authController')

//Render login page
router.get('/login',authController.renderLoginPage)

//Render register page
router.get('/register',authController.renderRegisterPage)

module.exports = router