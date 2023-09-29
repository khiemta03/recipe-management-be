const userQueries = require('./user-queries')



module.exports = {
    getUserProfile: userQueries.getUserProfile,
    addNewUser: userQueries.addNewUser
}