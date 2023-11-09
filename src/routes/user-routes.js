const express = require('express')
const router = express.Router()
const { getAllUsersController, getUserProfileController, addNewUserController, deleteUserController, updateUserProfileController } = require('../controllers/index')
const { validateToken, isSupderAdmin } = require('../middlewares/index')



router
    .use(validateToken)

    .get('/profile', getUserProfileController)
    .get('/:id', getUserProfileController)
    .get('/', isSupderAdmin, getAllUsersController)

    // .post('/', isSupderAdmin, addNewUserController)

// .delete('/:id', validateToken, isSupderAdmin.deleteUserController)

// .put('/profile', validateToken, updateUserProfileController)
// .put('/:id', validateToken, isSupderAdmin, updateUserProfileController)

module.exports = router