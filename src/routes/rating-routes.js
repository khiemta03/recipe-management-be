const express = require('express')
const router = express.Router({ mergeParams: true })
const { ratingController, getRatingOfRecipeController } = require('../controllers/rating-controller')
const { validateToken } = require('../middlewares/index');

router
    .get('/:recipeId', validateToken,  getRatingOfRecipeController)

    .post('/:recipeId', validateToken, ratingController)

module.exports = router