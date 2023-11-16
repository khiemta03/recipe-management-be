const express = require('express')
const router = express.Router()
const { getRecipesController,
    recipesCountController,
    getRecipeController,
    getPendingRecipesController,
    getDeletedRecipesController } = require('../controllers/index')
const { hasToken, isAdmin, validateToken } = require('../middlewares/index')




router
    .get('/pending', validateToken, isAdmin, getPendingRecipesController)
    .get('/deleted', validateToken, isAdmin, getDeletedRecipesController)
    .get('/count', recipesCountController)
    .get('/:id', hasToken, getRecipeController)
    .get('/', hasToken, getRecipesController)

module.exports = router