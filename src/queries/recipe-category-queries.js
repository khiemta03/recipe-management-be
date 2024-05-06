const postgres = require('../databases/postgreSQL')

const getNumOfRecipeCategories = async () => {
    const queryString = `select count(*) from CATEGORIES`
    try {
        const numOfRecipeCategoriesData = await postgres.query(queryString)
        const formattedData = numOfRecipeCategoriesData.rows[0]
        return formattedData
    } catch (err) {
        throw new Error('Internal Server Error')
    }
}

const getRecipeCategories = async () => {
    const queryString = `select * from CATEGORIES`
    try {
        const recipeCategoryData = await postgres.query(queryString)
        const formattedData = recipeCategoryData.rows
        return formattedData
    } catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

module.exports = {
    getNumOfRecipeCategories,
    getRecipeCategories
}