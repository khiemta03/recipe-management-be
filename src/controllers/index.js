
const {getCommentsController, addCommentController, removeCommentController, updateCommentController} = require('./comment-controller');
const { loginController, registerController, logoutController } = require('./auth-controller')
const { recipeCategoriesController, recipeCategoryCountController } = require('./recipe-category-controller')
const { getRecipesController, recipesCountController, getRecipeController,
    getPendingRecipesController, getRecipesOfUserController } = require('./recipe-controller')
const { getAllUsersController, getUserProfileController, addNewUserController,
    deleteUserController, updateUserProfileController } = require('./user-controller')
const { getRolesController } = require('../controllers/role-controller')
const { getFavouriteRecipesController, addNewFavouriteRecipeController } = require('./favourite-controller')
const { ratingController, getRatingOfRecipeController} =require('./rating-controller')
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
    getAllUsersController,
    getUserProfileController,
    addNewUserController,
    deleteUserController,
    updateUserProfileController,
    getCommentsController,
    addCommentController,
    removeCommentController,
    updateCommentController,
    getRolesController,
    getFavouriteRecipesController,
    addNewFavouriteRecipeController,
    getRecipesOfUserController,
    ratingController,
    getRatingOfRecipeController
}