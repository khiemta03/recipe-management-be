const {loginController, registerController} = require('./auth-controller')
const {recipeCategoriesController, recipeCategoryCountController} = require('./recipe-category-controller')
const {getRecipesController, recipesCountController} = require('./recipe-controller')

module.exports = {
    loginController,
    registerController,
    recipeCategoriesController,
    recipeCategoryCountController,
    recipesCountController,
    getRecipesController
}