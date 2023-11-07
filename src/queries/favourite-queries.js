const postgres = require('../databases/postgreSQL')



const getFavouriteRecipes = async (userId) => {
    const queryString = 'select RecipeId from FAVORITE where UserId = $1';
    const values = [userId]
    try {
        const recipeData = await postgres.query(queryString, values);
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows : []
        return formattedData
    }
    catch (err) {
        throw new Error('Internal Server Error');
    }
}


module.exports = {
    getFavouriteRecipes
}