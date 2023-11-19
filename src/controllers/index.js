const {loginController, registerController, logoutController} = require('./auth-controller')
const {recipeCategoriesController, recipeCategoryCountController} = require('./recipe-category-controller')
const {getRecipesController, recipesCountController} = require('./recipe-controller')
const {getAllUsersController, getUserProfileController, addNewUserController, deleteUserController, updateUserProfileController} = require('./user-controller')
const {getCommentsController} = require('./comment-controller');

module.exports = {
    loginController,
    registerController,
    logoutController,
    recipeCategoriesController,
    recipeCategoryCountController,
    recipesCountController,
    getRecipesController,
    getAllUsersController,
    getUserProfileController,
    addNewUserController,
    deleteUserController,
    updateUserProfileController,
    getCommentsController
}