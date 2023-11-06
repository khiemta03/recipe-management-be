const postgres = require('../databases/postgreSQL')

const getNumOfRecipeCategories = async () => {
    const queryString = `select count(*) from CATEGORIES`
    try {
        const numOfRecipeCategoriesData = await postgres.query(queryString)
        return numOfRecipeCategoriesData.rows[0]
    } catch (err) {
        throw new Error('Internal Server Error')
    }
}

const getRecipeCategories = async () => {
    const queryString = `select * from CATEGORIES`
    try {
        const recipeCategoryData = await postgres.query(queryString)
        return recipeCategoryData.rows
    } catch (err) {
        throw new Error('Internal Server Error')
    }
}

module.exports = {
    getNumOfRecipeCategories,
    getRecipeCategories
}