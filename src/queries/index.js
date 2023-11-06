const userQueries = require('./user-queries')
const { getRecipes, getNumOfRecipes } = require('./recipe-queries')
const { getNumOfRecipeCategories, getRecipeCategories } = require('./recipe-category-queries')
const { getRoleByRoleId } = require('./role-queries')


module.exports = {
    getUserProfile: userQueries.getUserProfile,
    addNewUser: userQueries.addNewUser,
    getNumOfRecipeCategories,
    getRecipeCategories,
    getRecipes,
    getNumOfRecipes,
    getRoleByRoleId
}