const express = require('express')
const router = express.Router()
const { loginController, registerController, logoutController } = require('../controllers/index')
const { changePasswordController } = require('../controllers/auth-controller')
const { validateToken } = require('../middlewares/index');




router
    .post('/login', loginController)
    .post('/register', registerController)
    .post('/logout', validateToken, logoutController)

    .put('/password/reset', validateToken, changePasswordController)


module.exports = router