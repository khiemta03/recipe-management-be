const express = require('express')
const router = express.Router()
const { getAllUsersController, getUserProfileController, addNewUserController, deleteUserController } = require('../controllers/index')
const { getUserCountController, getUserStatisticsController, updateUserStatusController, updateUserRoleController } = require('../controllers/user-controller')
const { validateToken, isSupderAdmin } = require('../middlewares/index')

router
    .use(validateToken)

    .get('/count', isSupderAdmin, getUserCountController)
    .get('/count/statistic', isSupderAdmin, getUserStatisticsController)
    .get('/:id', getUserProfileController)
    .get('/', isSupderAdmin, getAllUsersController)

    .post('/', isSupderAdmin, addNewUserController)

    .put('/:id/status', isSupderAdmin, updateUserStatusController)
    .put('/:id/role', isSupderAdmin, updateUserRoleController)

    .delete('/:id', isSupderAdmin, deleteUserController)


module.exports = router