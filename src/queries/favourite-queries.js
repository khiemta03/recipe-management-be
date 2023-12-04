const postgres = require('../databases/postgreSQL')

const isInFavourites = async (userId, recipeId) => {
    const queryString = 'select count(*) from FAVORITE where UserId = $1 and RecipeId = $2';
    const values = [userId, recipeId]
    try {
        const data = await postgres.query(queryString, values);
        const result = data.rows[0].count > 0
        return result
    }
    catch (err) {
        throw new Error('Lỗi server');
    }
}

const getFavouriteRecipes = async (userId) => {
    const queryString = 'select RecipeId from FAVORITE where UserId = $1';
    const values = [userId]
    try {
        const recipeData = await postgres.query(queryString, values);
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows : []
        return formattedData
    }
    catch (err) {
        throw new Error('Lỗi server');
    }
}

const getDetailFavouriteRecipes = async (userId, page, per_page, sort_by, category, keyword) => {
    let queryString = `select RECIPES.*, CATEGORIES.Name AS category , AVG(rating.rating) AS averagerating, COUNT(rating.rating)::integer AS reviews
                        \nfrom RECIPES join FAVORITE on RECIPES.RecipeId = FAVORITE.RecipeId and FAVORITE.UserId = $3
                        \nleft join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nleft join RATING on RECIPES.RecipeId = RATING.RecipeId
                        \nwhere RECIPES.status = 'Approved'`
    let values = [(page - 1) * per_page, per_page, userId]
    if (category !== 'all') {
        queryString += '\nand CATEGORIES.CategoryId = $4'
        values.push(category)
    }

    if (keyword) {
        if (category !== 'all') {
            queryString += '\nand LOWER(RECIPES.Name) like LOWER($5)'
        } else {
            queryString += '\nand LOWER(RECIPES.Name) like LOWER($4)'
        }
        values.push(`%${keyword}%`)
    }
    queryString += '\ngroup by RECIPES.RecipeId, RECIPES.Name, CATEGORIES.Name'
    queryString += sort_by === 'date' ? '\norder by DateSubmit Desc' : ''
    queryString += sort_by === 'rating' ? '\norder by AVG(rating.rating) Desc nulls last' : ''
    queryString += '\noffset $1\nlimit $2'
    try {
        const recipeData = await postgres.query(queryString, values);
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows : []
        return formattedData
    }
    catch (err) {
        throw new Error('Lỗi server');
    }
}


const getNumOfFavouriteRecipes = async (userId, category, keyword) => {
    let queryString = `select count(*)
                        \nfrom RECIPES join FAVORITE on RECIPES.RecipeId = FAVORITE.RecipeId and FAVORITE.UserId = $1
                        \njoin CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nwhere RECIPES.status = 'Approved'`
    let values = [userId]
    if (category !== 'all') {
        queryString += '\nand CATEGORIES.CategoryId = $2'
        values.push(category)
    }

    if (keyword) {
        if (category !== 'all') {
            queryString += '\nand LOWER(RECIPES.Name) like LOWER($3)'
        } else {
            queryString += '\nand LOWER(RECIPES.Name) like LOWER($2)'
        }
        values.push(`%${keyword}%`)
    }

    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = parseInt(recipeData.rows[0].count)
        return formattedData
    } catch (err) {
        throw new Error('Lỗi server')
    }
}

const addNewFavouriteRecipe = async (userId, recipeId) => {
    const queryString = 'insert into FAVORITE values($1, $2)';
    const values = [userId, recipeId]
    try {
        await postgres.query(queryString, values);

    }
    catch (err) {
        throw new Error('Lỗi server');
    }
}

const removeFavouriteRecipe = async (userId, recipeId) => {
    const queryString = 'delete from FAVORITE where UserId = $1 and RecipeId = $2';
    const values = [userId, recipeId]
    try {
        await postgres.query(queryString, values);

    }
    catch (err) {
        throw new Error('Lỗi server');
    }
}

module.exports = {
    getFavouriteRecipes,
    getDetailFavouriteRecipes,
    getNumOfFavouriteRecipes,
    isInFavourites,
    addNewFavouriteRecipe,
    removeFavouriteRecipe
}