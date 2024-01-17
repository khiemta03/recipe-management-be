const authRoutes = require('./auth-routes')
const recipeCategoryRoutes = require('./recipe-category-routes')
const recipeRoutes = require('./recipe-routes')
const userRoutes = require('./user-routes')
const commentRoutes = require('./comment-routes')
const roleRoutes = require('./role-routes')
const usersRoutes = require('./users-routes')
const ratingRoutes = require('./rating-routes')

module.exports = {
    authRoutes,
    recipeCategoryRoutes,
    recipeRoutes,
    userRoutes,
    commentRoutes,
    usersRoutes,
    roleRoutes,
    ratingRoutes
}