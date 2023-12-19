const express = require('express')
const router = express.Router()
const { getRecipesOfUserController } = require('../controllers/index')
const { addNewRecipeController, updateRecipeController, getRecipeStatisticsOfUser, getRecipeCountOfUser } = require('../controllers/recipe-controller')
const upload = require('../helpers/multer')

router
    .get('/count/statistic', getRecipeStatisticsOfUser)
    .get('/count', getRecipeCountOfUser)
    .get('/', getRecipesOfUserController)

    .post('/', upload.single('image'), addNewRecipeController)

    .put('/:id', upload.single('image'), updateRecipeController)


module.exports = router