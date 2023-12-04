const { Rating, getNumberRatingOfRecipe, getUserRatingofRecipe, updateRating, getRatingofUser } = require('../queries/rating-queries.js');

//post
const ratingController = async (req, res) => {
    const userId = req.user.userId;
    const recipeId = req.body['recipe'];
    const rate = req.body['rating'];
    try {
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
    const userId = req.user.userId;
    const recipeId = req.query['recipe'];
    try {
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
    const userId = req.user.userId;
    const recipeId = req.params['id'];
    const newRate = req.body['newrate'];
    try {
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
