const express = require('express')
const router = express.Router()
const {loginController, registerController} = require('../controllers/index')




router
    .post('/auth/login', loginController)
    .post('/auth/register', registerController)


module.exports = router