const {getUserProfile, addNewUser, getAllUsers} = require('./user-queries')
const { getRecipes, getNumOfRecipes, getRecipe } = require('./recipe-queries')
const { getNumOfRecipeCategories, getRecipeCategories } = require('./recipe-category-queries')
const { getRoleByRoleId } = require('./role-queries')
const {getFavouriteRecipes} = require('./favourite-queries')
const {getToken, addToken, deleteToken} = require('./token-queries')
const {getComments, addComment, removeComment, updateComment} = require('./comment-queries')
const {getAllRoles} = require('./role-queries')

module.exports = {
    getUserProfile,
    addNewUser,
    getAllUsers,
    getNumOfRecipeCategories,
    getRecipeCategories,
    getRecipes,
    getRecipe,
    getNumOfRecipes,
    getRoleByRoleId,
    getFavouriteRecipes,
    getToken,
    addToken,
    deleteToken,
    getComments,
    addComment,
    removeComment,
    updateComment,
    getAllRoles
}