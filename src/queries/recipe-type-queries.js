const postgres = require('../databases/postgreSQL')

const getNumOfRecipeTypes = async () => {
    const queryString = `select count(*) from LOAICT`
    try {
        const numOfRecipeTypesData = await postgres.query(queryString)
        return numOfRecipeTypesData.rows[0]
    } catch (err) {
        throw err
    }
}

const getRecipeTypes = async() => {
    const queryString = `select * from LOAICT`
    try {
        const recipeTypesData = await postgres.query(queryString)
        if (recipeTypesData.rowCount == 0) {
            throw new Error()
        }
        return recipeTypesData.rows
    } catch (err) {
        throw err
    }
}

module.exports = {
    getNumOfRecipeTypes,
    getRecipeTypes
}