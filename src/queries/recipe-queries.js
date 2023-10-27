const postgres = require('../databases/postgreSQL')

const getRecipes = async (page, per_page, sort_by) => {
    page = page ? page : 1
    per_page = per_page ? per_page : null

    const queryString = `select * from CONGTHUC 
                         offset ${(page - 1) * per_page}
                         limit ${per_page}`
    try {
        const recipeData = await postgres.query(queryString)
        if (recipeData.rowCount == 0) {
            throw new Error()
        }
        return recipeData.rows
    } catch (err) {
        throw err
    }
}

const getNumOfRecipes = async () => {
    const queryString = `select count(*) from CONGTHUC`
    try {
        const recipeData = await postgres.query(queryString)
        return recipeData.rows[0]
    } catch (err) {
        throw err
    }
}

module.exports = {
    getRecipes,
    getNumOfRecipes
}