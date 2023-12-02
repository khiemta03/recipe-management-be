const {getUserProfile, addNewUser, getAllUsers} = require('./user-queries')
const { getRecipes, getNumOfRecipes } = require('./recipe-queries')
const { getNumOfRecipeCategories, getRecipeCategories } = require('./recipe-category-queries')
const { getRoleByRoleId } = require('./role-queries')
const {getFavouriteRecipes} = require('./favourite-queries')
const {getToken, addToken, deleteToken} = require('./token-queries')
const {getComments, addComment, removeComment, updateComment} = require('./comment-queries')


module.exports = {
    getUserProfile,
    addNewUser,
    getAllUsers,
    getNumOfRecipeCategories,
    getRecipeCategories,
    getRecipes,
    getNumOfRecipes,
    getRoleByRoleId,
    getFavouriteRecipes,
    getToken,
    addToken,
    deleteToken,
    getComments,
    addComment,
    removeComment,
    updateComment
}