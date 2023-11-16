const { getRecipes, getNumOfRecipes, getFavouriteRecipes, getRecipe, getUserProfile, getRoleByRoleId } = require('../queries/index')
const { isEmpty } = require('../utils/objectUtils')

// get all approved recipes
const getRecipesController = async (req, res) => {
    try {
        const category = req.query['category'] || 'all'
        let page = req.query['page'] || 1
        page = parseInt(page)
        const recipeCount = await getNumOfRecipes(category)
        let perPage = req.query['per_page'] || recipeCount
        perPage = parseInt(perPage)
        const sortBy = req.query['sort_by'] || 'date'
        let recipeData = await getRecipes(page, perPage, sortBy, category)

        //keyword to search
        const keyword = req.query['keyword'] || null
        if (keyword) {
            recipeData = recipeData.filter(r => r.name.toLowerCase().includes(keyword.toLowerCase()) || r.description.toLowerCase().includes(keyword.toLowerCase()))
        }
        // add field isFavourite
        const userData = req.user
        if (isEmpty(userData) === false) {

            const favouriteRecipes = await getFavouriteRecipes(userData.userid)
            for (const r of recipeData) {
                r.isfavourite = favouriteRecipes.some(fav => fav.recipeid === r.recipeid);
            }
        } else {
            for (const r of recipeData) {
                r.isfavourite = false
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
            keyword: keyword,
            data: recipeData
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const getPendingRecipesController = async (req, res) => {
    try {
        const status = 'Pending'
        const category = req.query['category'] || 'all'
        let page = req.query['page'] || 1
        page = parseInt(page)
        const recipeCount = await getNumOfRecipes(category, status)
        let perPage = req.query['per_page'] || recipeCount
        perPage = parseInt(perPage)
        const sortBy = req.query['sort_by'] || 'date'
        const recipeData = await getRecipes(page, perPage, sortBy, category, status)

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

const getDeletedRecipesController = async (req, res) => {
    try {
        const status = 'Deleted'
        const category = req.query['category'] || 'all'
        let page = req.query['page'] || 1
        page = parseInt(page)
        const recipeCount = await getNumOfRecipes(category, status)
        let perPage = req.query['per_page'] || recipeCount
        perPage = parseInt(perPage)
        const sortBy = req.query['sort_by'] || 'date'
        const recipeData = await getRecipes(page, perPage, sortBy, category, status)

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

// get specific recipe by id
const getRecipeController = async (req, res) => {
    const id = req.params['id']

    try {

        const recipeData = await getRecipe(id)
        //check user
        const userData = req.user
        if (recipeData.status !== 'Approved') {
            if (!isEmpty(userData)) {
                const roleName = await getRoleByRoleId(userData.role)
                if (roleName === 'User' && userData.userid !== recipeData.author) {
                    throw new Error('Bạn không có quyền truy cập vào tài nguyên này')
                }
            }
            else {
                throw new Error('Bạn không có quyền truy cập vào tài nguyên này')
            }
        }

        res.json({
            status: 200,
            data: recipeData
        })
    }
    catch (err) {
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
    getRecipesController,
    getRecipeController,
    getPendingRecipesController,
    getDeletedRecipesController
}