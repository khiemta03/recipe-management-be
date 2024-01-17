const express = require('express')
const router = express.Router()
const { getRecipesController,
    recipesCountController,
    getRecipeController,
    getPendingRecipesController } = require('../controllers/index')
const { hasToken, isAdmin, validateToken, isSupderAdmin } = require('../middlewares/index')

const { changeRecipeStatusController, getRecipeStatisticsOfAdmin, getRejectedRecipesController } = require('../controllers/recipe-controller')




router
    .get('/pending', validateToken, isAdmin, getPendingRecipesController)
    .get('/rejected', validateToken, isAdmin, getRejectedRecipesController)
    .get('/count/statistic', validateToken, isSupderAdmin, getRecipeStatisticsOfAdmin)
    .get('/count', recipesCountController)
    .get('/:id', hasToken, getRecipeController)
    .get('/', hasToken, getRecipesController)

    .put('/:id/status', validateToken, changeRecipeStatusController)

module.exports = router