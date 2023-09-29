const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/auth')




router
    .post('/auth/login', authControllers.loginController)
    .post('/auth/signup', authControllers.registerController)


module.exports = router