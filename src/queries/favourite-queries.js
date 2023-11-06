const postgres = require('../databases/postgreSQL')



const getFavouriteRecipes = async (userId) => {
    const queryString = `select RecipeId from FAVORITE where UserId = '${userId}'`;

    try {
        const recipeData = await postgres.query(queryString);
        if(recipeData.rowCount > 0) {
            // console.log(recipeData)
            return recipeData.rows;
        }
        return '';
    }
    catch(err) {
        throw err;
    }
}


module.exports = {
    getFavouriteRecipes
}