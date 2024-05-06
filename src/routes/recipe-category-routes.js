const express = require('express')
const router = express.Router()
const { recipeCategoriesController, recipeCategoryCountController } = require('../controllers/index')





router
    .get('/count', recipeCategoryCountController)
    .get('/', recipeCategoriesController)

module.exports = router