const express = require('express')
const router = express.Router()
const { recipeTypesCountController, getRecipeTypesController } = require('../controllers/index')





router
    .get('/count', recipeTypesCountController)
    .get('/', getRecipeTypesController)

module.exports = router