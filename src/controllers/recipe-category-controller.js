const { getRecipeCategories, getNumOfRecipeCategories } = require('../queries/index')


const recipeCategoryCountController = async (req, res) => {
    try {
        const recipeCategoryCount = await getNumOfRecipeCategories()
        res.json({
            status: 200,
            data: recipeCategoryCount
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const recipeCategoriesController = async (req, res) => {
    try {
        const recipeCategoryData = await getRecipeCategories()
        recipeCategoryData.splice(0, 0, {
            categoryid: 'Tất cả',
            name: 'Tất cả'
        })
        res.json({
            status: 200,
            data: recipeCategoryData
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}


module.exports = {
    recipeCategoriesController,
    recipeCategoryCountController
}