const express = require('express')
const router = express.Router()
const { getAllUsersController, getUserProfileController, addNewUserController, deleteUserController, updateUserProfileController } = require('../controllers/index')
const { validateToken, isSupderAdmin } = require('../middlewares/index')
const { saveUserAvatar } = require('../middlewares/save-image')


router
    .use(validateToken)

    .get('/profile', getUserProfileController)

    .get('/:id', getUserProfileController)
    .get('/', isSupderAdmin, getAllUsersController)

    .post('/', isSupderAdmin, addNewUserController)

    .delete('/:id', isSupderAdmin, deleteUserController)

    .put('/', saveUserAvatar, updateUserProfileController)

module.exports = router