const express = require('express')
const router = express.Router({ mergeParams: true })
const {ratingController, getRatingOfRecipeController, updateRatingController} = require('../controllers/rating-controller')

router
    .get('/', getRatingOfRecipeController)

    .post('/', ratingController)

    .put('/:id', updateRatingController)

module.exports = router