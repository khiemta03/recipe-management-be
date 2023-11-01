const express = require('express')
const router = express.Router()
const { getRecipesController, recipesCountController } = require('../controllers/index')




router
    .get('/', getRecipesController)
    .get('/count', recipesCountController)

module.exports = router