const {loginController, registerController} = require('./auth-controller')
const {recipeTypesCountController, getRecipeTypesController} = require('./recipe-type-controller')
const {getRecipesController, recipesCountController} = require('./recipe-controller')

module.exports = {
    loginController,
    registerController,
    recipeTypesCountController,
    getRecipeTypesController,
    recipesCountController,
    getRecipesController
}