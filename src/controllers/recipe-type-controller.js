const {getNumOfRecipeTypes, getRecipeTypes} = require('../queries/index')


const recipeTypesCountController = async (req, res) => {
    try {
        const recipeTypesCount = await getNumOfRecipeTypes()
        console.log(recipeTypesCount)
        res.json({  
            status: 200,
            data: recipeTypesCount
        })
    } catch(err) {
        res.status(401).json({
            status: 401,
            message: err.message
        })
    }
}

const getRecipeTypesController = async (req, res) => {
    try {
        const recipeTypeData = await getRecipeTypes()
        res.json({
            status: 200,
            data: recipeTypeData
        })
    } catch (err) {
        res.status(401).json({
            status: 401,
            message: err.message
        })
    }
}


module.exports = {
    recipeTypesCountController,
    getRecipeTypesController
}