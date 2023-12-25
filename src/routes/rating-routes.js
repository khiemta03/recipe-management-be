const express = require('express')
const router = express.Router({ mergeParams: true })
const { ratingController, getRatingOfRecipeController, updateRatingController } = require('../controllers/rating-controller')
const { validateToken } = require('../middlewares/index');

router
    .get('/:recipeId', validateToken,  getRatingOfRecipeController)

    .post('/:recipeId', validateToken, ratingController)

    .put('/:recipeId', validateToken, updateRatingController)

module.exports = router