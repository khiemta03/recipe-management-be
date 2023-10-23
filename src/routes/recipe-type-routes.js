const express = require('express')
const router = express.Router()
const { recipeTypesCountController, recipeTypesRetrievalController } = require('../controllers/index')





router
    .get('/count', recipeTypesCountController)
    .get('/', recipeTypesRetrievalController)

module.exports = router