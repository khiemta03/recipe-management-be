const express = require('express')
const router = express.Router()
const { recipesRetrievalController, recipesCountController } = require('../controllers/index')




router
    .get('/', recipesRetrievalController)
    .get('/count', recipesCountController)

module.exports = router