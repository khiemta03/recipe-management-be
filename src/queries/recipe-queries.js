const postgres = require('../databases/postgreSQL')

const getRecipes = async (page, per_page, sort_by, category, status = 'Approved', keyword) => {

    let queryString = `select RECIPES.*, AVG(rating.rating) AS averagerating, COUNT(rating.rating)::integer AS reviews\nfrom RECIPES left join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nleft join RATING on RECIPES.RecipeId = RATING.RecipeId\nwhere 1 = 1`
    let values = [(page - 1) * per_page, per_page, status]
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

    queryString += "\nand RECIPES.status = $3"
    queryString += '\ngroup by RECIPES.RecipeId'
    queryString += sort_by === 'date' ? '\norder by DateSubmit Desc' : ''
    queryString += sort_by === 'rating' ? '\norder by AVG(rating.rating) Desc nulls last' : ''
    queryString += '\noffset $1\nlimit $2'

    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows : []
        return formattedData
    } catch (err) {
        console.log(err)
        throw new Error('Lỗi server')
    }
}

const getRecipe = async (recipeId) => {
    const queryString = `select RECIPES.*, AVG(rating.rating) AS averagerating, COUNT(rating.rating)::integer AS reviews
                        \nfrom RECIPES left join RATING on RECIPES.RecipeId = RATING.RecipeId where RECIPES.RecipeId = $1
                        \ngroup by RECIPES.RecipeId`
    const values = [recipeId]
    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows[0] : {}
        return formattedData
    }
    catch (err) {
        throw new Error('Lỗi server')
    }
}

const getNumOfRecipes = async (category = 'all', status = 'Approved', keyword) => {
    let queryString = `select count(*)\nfrom RECIPES, CATEGORIES\nwhere RECIPES.Category = CATEGORIES.CategoryId`
    let values = [status]
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


    queryString += "\nand RECIPES.status = $1"
    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = parseInt(recipeData.rows[0].count)
        return formattedData
    } catch (err) {
        throw new Error('Lỗi server')
    }
}

module.exports = {
    getRecipes,
    getRecipe,
    getNumOfRecipes
}