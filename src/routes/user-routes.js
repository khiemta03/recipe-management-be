const express = require('express')
const router = express.Router()
const { getUserProfileController, updateUserProfileController, getRecipesOfUserController } = require('../controllers/index')
const { validateToken } = require('../middlewares/index')
const { saveUserAvatar } = require('../middlewares/save-image')
const favouriteRouter = require('./favourite-routes')
const userRecipeRouter = require('./user-recipe-routes')

router
    .use(validateToken)
    .use('/favourites', favouriteRouter)
    .use('/recipes', userRecipeRouter)

    .get('/profile', getUserProfileController)

    .put('/', saveUserAvatar, updateUserProfileController)

module.exports = router