const express = require('express')
const router = express.Router({ mergeParams: true })
const {ratingController, getRatingOfRecipeController, updateRatingController} = require('../controllers/rating-controller')

router
    .get('/:recipeId', getRatingOfRecipeController)

    .post('/:recipeId', ratingController)

    .put('/:recipeId', updateRatingController)

module.exports = router