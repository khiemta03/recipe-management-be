const {loginController, registerController} = require('./auth-controller')
const {recipeTypesCountController, recipeTypesRetrievalController} = require('./recipe-type-controller')
const {recipesRetrievalController, recipesCountController} = require('./recipe-controller')

module.exports = {
    loginController,
    registerController,
    recipeTypesCountController,
    recipesRetrievalController,
    recipesCountController,
    recipeTypesRetrievalController
}