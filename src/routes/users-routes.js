const express = require('express')
const router = express.Router()
const { getAllUsersController, getUserProfileController, addNewUserController, deleteUserController } = require('../controllers/index')
const { validateToken, isSupderAdmin } = require('../middlewares/index')

router
    .use(validateToken)

    .get('/:id', getUserProfileController)
    .get('/', isSupderAdmin, getAllUsersController)

    .post('/', isSupderAdmin, addNewUserController)

    .delete('/:id', isSupderAdmin, deleteUserController)


module.exports = router