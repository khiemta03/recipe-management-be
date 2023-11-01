const {getRecipeCategories, getNumOfRecipeCategories} = require('../queries/index')


const recipeCategoryCountController = async (req, res) => {
    try {
        const recipeCategoryCount = await getNumOfRecipeCategories()
        res.json({  
            status: 200,
            data: recipeCategoryCount
        })
    } catch(err) {
        res.status(401).json({
            status: 401,
            message: err.message
        })
    }
}

const recipeCategoriesController = async (req, res) => {
    try {
        const recipeCategoryData = await getRecipeCategories()
        res.json({
            status: 200,
            data: recipeCategoryData
        })
    } catch (err) {
        res.status(401).json({
            status: 401,
            message: err.message
        })
    }
}


module.exports = {
    recipeCategoriesController,
    recipeCategoryCountController
}