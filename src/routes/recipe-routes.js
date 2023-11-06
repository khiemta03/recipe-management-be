const express = require('express')
const router = express.Router()
const { getRecipesController, recipesCountController } = require('../controllers/index')
const { hasToken } = require('../middlewares/index')




router
    .get('/', hasToken, getRecipesController)
    .get('/count', recipesCountController)

module.exports = router