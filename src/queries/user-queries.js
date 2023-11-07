const e = require('cors')
const postgres = require('../databases/postgreSQL')


//Dung id hoac username
const getUserProfile = async (obj) => {
    const queryString = obj.username ? 'select * from Users where Username = $1;' : 'select * from Users where UserId = $1;'
    const values = obj.username ? [obj.username] : [obj.userId]
    try {
        const userQueryData = await postgres.query(queryString, values)

        const userFormattedData = userQueryData.rowCount >= 1 ? userQueryData.rows[0] : {}
        return userFormattedData
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


//add new user for register function
const addNewUser = async (username, password, name, email, role = 1, avatar = null) => {
    const queryString = 'insert into Users(username, password, name, email, role, avatar) values($1, $2, $3, $4, $5, $6)';
    const values = [username, password, name, email, role, avatar]
    try {
        await postgres.query(queryString, values);
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}

module.exports = {
    getUserProfile,
    addNewUser
}