const { getDetailFavouriteRecipes, getNumOfFavouriteRecipes, isInFavourites, addNewFavouriteRecipe, removeFavouriteRecipe } = require('../queries/favourite-queries')
const { getRecipe } = require('../queries/recipe-queries')
const { isEmpty } = require('../utils/objectUtils')

const getFavouriteRecipesController = async (req, res) => {
    const userId = req.user.userId
    try {

        const category = req.query['category'] || 'all'
        let page = req.query['page'] || 1
        page = parseInt(page)
        const keyword = req.query['keyword'] || null
        const recipeCount = await getNumOfFavouriteRecipes(userId, category, keyword)
        let perPage = req.query['per_page'] || recipeCount
        perPage = parseInt(perPage)
        const sortBy = req.query['sort_by'] || 'date'
        const favouriteRecipes = await getDetailFavouriteRecipes(userId, page, perPage, sortBy, category, keyword)
        res.json({
            status: 200,
            page: page,
            per_page: perPage,
            total: recipeCount,
            total_page: recipeCount % perPage === 0 ? Math.floor(recipeCount / perPage) : Math.floor(recipeCount / perPage) + 1,
            sort_by: sortBy,
            category: category,
            keyword: keyword,
            user: userId,
            data: favouriteRecipes,
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const addNewFavouriteRecipeController = async (req, res) => {
    const userId = req.user.userId
    const recipeId = req.body['recipe']
    try {

        const recipeData = await getRecipe(recipeId)
        if (isEmpty(recipeData)) {
            throw new Error('Công thức này không tồn tại')
        }
        const isInFavouriteRecipes = await isInFavourites(userId, recipeId)
        if (isInFavouriteRecipes) {
            throw new Error('Công thức này đã nằm trong danh sách yêu thích của bạn')
        }

        await addNewFavouriteRecipe(userId, recipeId)

        res.json({
            status: 200,
            message: 'Đã thêm vào danh sách yêu thích'
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const removeRecipeFromFavouritesController = async (req, res) => {
    const userId = req.user.userId
    const recipeId = req.params['id']
    try {

        const recipeData = await getRecipe(recipeId)
        if (isEmpty(recipeData)) {
            throw new Error('Công thức này không tồn tại')
        }
        const isInFavouriteRecipes = await isInFavourites(userId, recipeId)
        if (!isInFavouriteRecipes) {
            throw new Error('Công thức này không nằm trong danh sách yêu thích của bạn')
        }

        await removeFavouriteRecipe(userId, recipeId)

        res.json({
            status: 200,
            message: 'Đã xóa khỏi danh sách yêu thích'
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

module.exports = {
    getFavouriteRecipesController,
    addNewFavouriteRecipeController,
    removeRecipeFromFavouritesController
}