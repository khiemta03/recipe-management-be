const postgres = require('../databases/postgreSQL')

const getRecipes = async (page, per_page, sort_by, category, isAdmin = false) => {

    let queryString = `select RECIPES.*, AVG(rating.rating) AS average_rating\nfrom RECIPES left join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nleft join RATING on RECIPES.RecipeId = RATING.RecipeId\nwhere 1 = 1`
    let values = [(page - 1) * per_page, per_page]
    if (category !== 'all') {
        queryString += '\nand CATEGORIES.name = $3'
        values.push(category)
    }

    queryString += isAdmin ? '' : "\nand RECIPES.status = 'Da duyet'"
    queryString += '\ngroup by RECIPES.RecipeId'
    queryString += sort_by === 'date' ? '\norder by DateSubmit Desc' : ''
    queryString += sort_by === 'rating' ? '\norder by AVG(rating.rating) Desc nulls last' : ''
    queryString += '\noffset $1\nlimit $2'

    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows : []
        return formattedData
    } catch (err) {
        throw new Error('Internal Server Error')
    }
}

const getNumOfRecipes = async (category = 'all', isAdmin = false) => {
    let queryString = `select count(*)\nfrom RECIPES, CATEGORIES\nwhere RECIPES.Category = CATEGORIES.CategoryId`
    let values = []
    if (category !== 'all') {
        queryString += '\nand CATEGORIES.name = $1'
        values = [category]
    }
    queryString += isAdmin ? '' : "\nand RECIPES.status = 'Da duyet'"
    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = parseInt(recipeData.rows[0].count)
        return formattedData
    } catch (err) {
        throw new Error('Internal Server Error')
    }
}

module.exports = {
    getRecipes,
    getNumOfRecipes
}