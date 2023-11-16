const express = require('express')
const router = express.Router()
const {loginController, registerController, logoutController} = require('../controllers/index')
const {validateToken} = require('../middlewares/index');




router
    .post('/login', loginController)
    .post('/register', registerController)
    .post('/logout', validateToken ,logoutController)


module.exports = router