const express = require('express')
const router = express.Router()
const { getRecipesController,
    recipesCountController,
    getRecipeController,
    getPendingRecipesController,
    getDeletedRecipesController } = require('../controllers/index')
const { hasToken, isAdmin, validateToken , isSupderAdmin} = require('../middlewares/index')

const { changeRecipeStatusController, getRecipeStatisticsOfAdmin } = require('../controllers/recipe-controller')




router
    .get('/pending', validateToken, isAdmin, getPendingRecipesController)
    .get('/deleted', validateToken, isAdmin, getDeletedRecipesController)
    .get('/count/statistic', validateToken, isSupderAdmin, getRecipeStatisticsOfAdmin)
    .get('/count', recipesCountController)
    .get('/:id', hasToken, getRecipeController)
    .get('/', hasToken, getRecipesController)

    .put('/:id/status', validateToken, changeRecipeStatusController)

module.exports = router