const postgres = require('../databases/postgreSQL')

const Rating = async (UserId, RecipeId, Rating) => {
    const queryString = 'insert into Rating values ($1, $2, $3)';
    const values = [UserId, RecipeId, Rating];
    try {
        await postgres.query(queryString, values);
    } catch (err) {
        throw new Error('Lỗi server');
    }
}

const getNumberRatingOfRecipe = async (RecipeId) => {
    const queryString = 'select count(rating) from Rating where RecipeId = $1';
    const values = [RecipeId];
    try {
        const result = await postgres.query(queryString, values);
        return result;
    } catch (err) {
        throw new Error('Lỗi server');
    }
}

const updateRating = async (UserId, RecipeId, Rating) => {
    const queryString = `update Rating
                        \nset Rating = $1
                        \nwhere UserId = $2 and RecipeId = $3`;
    const values = [Rating, UserId, RecipeId];
    try {
        await postgres.query(queryString, values);
    } catch (err) {
        throw new Error('Lỗi server');
    }

}

const getUserRatingofRecipe = async (RecipedId) => {
    const queryString = `SELECT Users.avatar, Users.name, Rating
                        \nFROM Rating join Users on Rating.UserId = Users.UserId
                        \nWHERE Rating.RecipeId = $1`;
    const values = [RecipedId];
    try {
        const result = await postgres.query(queryString, values);
        return result;
    } catch (err) {
        throw new Error('Lỗi server');
    }
}





module.exports = { Rating, getNumberRatingOfRecipe, updateRating, getUserRatingofRecipe }