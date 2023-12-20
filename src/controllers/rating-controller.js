const { Rating, getNumberRatingOfRecipe, getUserRatingofRecipe, updateRating, getRatingofUser } = require('../queries/rating-queries.js');
const boolean = require('../utils/booleanUtils');

//post
const ratingController = async (req, res) => {
    let userId = req.user.userId;
    let recipeId = req.body['recipe'];
    let rate = req.body['rating'];
    try {
        userId = boolean.uuidValidate(userId);
        recipeId = boolean.uuidValidate(recipeId);
        rate = boolean.integerValidate(rate);
        await Rating(userId, recipeId, rate);
        res.json({
            status: 200,
            message: 'Đánh giá thành công'
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

//get
const getRatingOfRecipeController = async (req, res) => {
    let userId = req.user.userId;
    let recipeId = req.query['recipe'];
    try {
        userId = boolean.uuidValidate(userId);
        recipeId = boolean.uuidValidate(recipeId);
        const userCount = await getNumberRatingOfRecipe(recipeId);
        const userData = await getUserRatingofRecipe(recipeId);
        const rated = await getRatingofUser(userId, recipeId);
        res.json({
            status: 200,
            total: userCount,
            data: userData,
            rated: rated
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

//put
const updateRatingController = async (req, res) => {
    let userId = req.user.userId;
    let recipeId = req.params['id'];
    let newRate = req.body['newrate'];
    try {
        userId = boolean.uuidValidate(userId);
        recipeId = boolean.uuidValidate(recipeId);
        newRate = boolean.integerValidate(newRate);
        await updateRating(userId, recipeId, newRate);
        res.json({
            status: 200,
            message: 'Đánh giá thành công'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

module.exports = { ratingController, getRatingOfRecipeController, updateRatingController }
