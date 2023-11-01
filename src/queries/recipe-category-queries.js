const postgres = require('../databases/postgreSQL')

const getNumOfRecipeCategories = async () => {
    const queryString = `select count(*) from LOAICT`
    try {
        const numOfRecipeCategoriesData = await postgres.query(queryString)
        return numOfRecipeCategoriesData.rows[0]
    } catch (err) {
        throw err
    }
}

const getRecipeCategories = async() => {
    const queryString = `select * from LOAICT`
    try {
        const recipeCategoryData = await postgres.query(queryString)
        if (recipeCategoryData.rowCount == 0) {
            throw new Error()
        }
        return recipeCategoryData.rows
    } catch (err) {
        throw err
    }
}

module.exports = {
    getNumOfRecipeCategories,
    getRecipeCategories
}