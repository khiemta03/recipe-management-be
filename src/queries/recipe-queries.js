const postgres = require('../databases/postgreSQL')

const getRecipes = async (page, per_page, sort_by, category, isAdmin = false) => {

    let queryString = `select RECIPES.*, AVG(rating.rating) AS average_rating\nfrom RECIPES left join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nleft join RATING on RECIPES.RecipeId = RATING.RecipeId\nwhere 1 = 1`
    queryString += category === 'all' ? '' : `\nand CATEGORIES.name = '${category}'`
    queryString += isAdmin ? '' : "\nand RECIPES.status = 'Da duyet'"
    queryString += '\ngroup by RECIPES.RecipeId'
    queryString += sort_by === 'date' ? '\norder by DateSubmit Desc' : ''
    queryString += sort_by === 'rating' ? '\norder by AVG(rating.rating) Desc nulls last' : ''
    queryString += `\noffset ${(page - 1) * per_page}\nlimit ${per_page}`
    try {
        const recipeData = await postgres.query(queryString)
        return recipeData.rows
    } catch (err) {
        throw new Error('Internal Server Error')
    }
}

const getNumOfRecipes = async (category = 'all', isAdmin = false) => {
    let queryString = `select count(*)\nfrom RECIPES, CATEGORIES\nwhere RECIPES.Category = CATEGORIES.CategoryId`
    queryString += category === 'all' ? '' : `\nand CATEGORIES.name = '${category}'`
    queryString += isAdmin ? '' : "\nand RECIPES.status = 'Da duyet'"
    try {
        const recipeData = await postgres.query(queryString)
        const recipeCount = parseInt(recipeData.rows[0].count)
        return recipeCount
    } catch (err) {
        throw new Error('Internal Server Error')
    }
}

module.exports = {
    getRecipes,
    getNumOfRecipes
}