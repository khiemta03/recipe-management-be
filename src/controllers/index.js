const {loginController, registerController, logoutController} = require('./auth-controller')
const {recipeCategoriesController, recipeCategoryCountController} = require('./recipe-category-controller')
const {getRecipesController, recipesCountController, getRecipeController, getPendingRecipesController, getDeletedRecipesController} = require('./recipe-controller')
const {getAllUsersController, getUserProfileController, addNewUserController, 
    deleteUserController, updateUserProfileController} = require('./user-controller')
const {getRolesController} = require('../controllers/role-controller')
const {getFavouriteRecipesController, addNewFavouriteRecipeController} = require('./favourite-controller')

module.exports = {
    loginController,
    registerController,
    logoutController,
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
    getRolesController,
    getFavouriteRecipesController,
    addNewFavouriteRecipeController
}