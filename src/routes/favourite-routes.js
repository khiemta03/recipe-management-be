const { getFavouriteRecipesController, addNewFavouriteRecipeController , removeRecipeFromFavouritesController} = require('../controllers/favourite-controller')
const express = require('express')
const router = express.Router({ mergeParams: true })

router
    .get('/', getFavouriteRecipesController)

    .post('/', addNewFavouriteRecipeController)

    .delete('/:id', removeRecipeFromFavouritesController)

module.exports = router
