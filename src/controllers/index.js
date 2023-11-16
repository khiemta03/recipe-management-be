const {loginController, registerController} = require('./auth-controller')
const {recipeCategoriesController, recipeCategoryCountController} = require('./recipe-category-controller')
const {getRecipesController, recipesCountController, getRecipeController, getPendingRecipesController, getDeletedRecipesController} = require('./recipe-controller')
const {getAllUsersController, getUserProfileController, addNewUserController, deleteUserController, updateUserProfileController} = require('./user-controller')
const {getRolesController} = require('../controllers/role-controller')

module.exports = {
    loginController,
    registerController,
    recipeCategoriesController,
    recipeCategoryCountController,
    recipesCountController,
    getRecipesController,
    getRecipeController,
    getPendingRecipesController,
    getDeletedRecipesController,
    getAllUsersController,
    getUserProfileController,
    addNewUserController,
    deleteUserController,
    updateUserProfileController,
    getRolesController
}