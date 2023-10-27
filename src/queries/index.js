const userQueries = require('./user-queries')
const { getRecipes, getNumOfRecipes } = require('./recipe-queries')
const { getNumOfRecipeTypes, getRecipeTypes } = require('./recipe-type-queries')


module.exports = {
    getUserProfile: userQueries.getUserProfile,
    addNewUser: userQueries.addNewUser,
    getNumOfRecipeTypes,
    getRecipes,
    getNumOfRecipes,
    getRecipeTypes
}