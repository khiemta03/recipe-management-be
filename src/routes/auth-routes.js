const express = require('express')
const router = express.Router()
const {loginController, registerController} = require('../controllers/index')




router
    .post('/login', loginController)
    .post('/register', registerController)


module.exports = router