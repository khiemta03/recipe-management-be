const {loginController, registerController} = require('./auth-controller')
const {recipeCategoriesController, recipeCategoryCountController} = require('./recipe-category-controller')
const {getRecipesController, recipesCountController} = require('./recipe-controller')
const {getAllUsersController, getUserProfileController, addNewUserController, deleteUserController, updateUserProfileController} = require('./user-controller')

module.exports = {
    loginController,
    registerController,
    recipeCategoriesController,
    recipeCategoryCountController,
    recipesCountController,
    getRecipesController,
    getAllUsersController,
    getUserProfileController,
    addNewUserController,
    deleteUserController,
    updateUserProfileController
}