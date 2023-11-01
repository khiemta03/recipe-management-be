const { getRecipes, getNumOfRecipes } = require('../queries/index')


const getRecipesController = async (req, res) => {
    const pageSize = req.query['page']
    const perPage = req.query['per_page']
    const sortBy = req.query['sort_by']
    try {
        const recipeData = await getRecipes(pageSize, perPage, sortBy)
        res.json({
            status: 200,
            data: recipeData
        })
    } catch (err) {
        res.status(401).json({
            status: 401,
            message: err.message
        })
    }
}

const recipesCountController = async (req, res) => {
    try {
        const recipeCount = await getNumOfRecipes()
        res.json({
            status: 200,
            data: recipeCount
        })
    } catch (err) {
        res.status(401).json({
            status: 401,
            message: err.message
        })
    }
}


module.exports = {
    recipesCountController,
    getRecipesController
}