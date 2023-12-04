const express = require('express')
const router = express.Router()
const { getUserProfileController, updateUserProfileController, getRecipesOfUserController } = require('../controllers/index')
const { validateToken } = require('../middlewares/index')
const favouriteRouter = require('./favourite-routes')
const userRecipeRouter = require('./user-recipe-routes')
const upload = require('../helpers/multer')

router
    .use(validateToken)
    .use('/favourites', favouriteRouter)
    .use('/recipes', userRecipeRouter)

    .get('/profile', getUserProfileController)

    .put('/profile', upload.single('image'), updateUserProfileController)

module.exports = router