const postgres = require('../databases/postgreSQL')


//Dung id hoac username
const getUserProfile = async (obj) => {
    let queryString = ''

    queryString = obj.username ? `select * from Users where Username = '${obj.username}'` : `select * from Users where UserId = '${obj.id}'`
    try {
        const userQueryData = await postgres.query(queryString)

        const userFormattedData = userQueryData.rowCount >= 1 ? userQueryData.rows[0] : {}
        return userFormattedData
    }
    catch (err) {
        throw (err)
    }
}


//add new user for register function
const addNewUser = async (username, password, name, email, role = 1, avatar = null) => {
    let queryString = `insert into Users(username, password, name, email, role, avatar)
                        values('${username}', '${password}', '${name}', '${email}', ${role}, '${avatar}')`;
    try {
        await postgres.query(queryString);
    }
    catch (err) {
        throw err
    }
}

module.exports = {
    getUserProfile,
    addNewUser
}