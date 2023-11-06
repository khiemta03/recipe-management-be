const { getRecipes, getNumOfRecipes, getUserProfile, getFavouriteRecipes } = require('../queries/index')
const { isEmpty } = require('../utils/objectUtils')

const getRecipesController = async (req, res) => {
    try {
        const category = req.query['category'] || 'all'
        let page = req.query['page'] || 1
        page = parseInt(page)
        const recipeCount = await getNumOfRecipes(category)
        let perPage = req.query['per_page'] || recipeCount
        perPage = parseInt(perPage)
        const sortBy = req.query['sort_by'] || 'date'
        const recipeData = await getRecipes(page, perPage, sortBy, category)

        // add field isFavourite
        const username = req.username
        if (username) {
            const userData = await getUserProfile({ username: username })
            if (isEmpty(userData)) {
                throw new Error('Invalid credentials')
            }
            const favouriteRecipes = await getFavouriteRecipes(userData.userid)
            for (const r of recipeData) {
                r.is_favourite = favouriteRecipes.some(fav => fav.recipeid === r.recipeid);
            }
        } else {
            for (const r of recipeData) {
                r.is_favourite = false
            }
        }

        //Response
        res.json({
            status: 200,
            page: page,
            per_page: perPage,
            total: recipeCount,
            total_page: recipeCount % perPage === 0 ? Math.floor(recipeCount / perPage) : Math.floor(recipeCount / perPage) + 1,
            sort_by: sortBy,
            category: category,
            data: recipeData
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const recipesCountController = async (req, res) => {
    const category = req.query['category'] || 'all'
    try {
        const recipeCount = await getNumOfRecipes(category)
        res.json({
            status: 200,
            category: category,
            data: {
                count: recipeCount
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}


module.exports = {
    recipesCountController,
    getRecipesController
}