const postgres = require('../databases/postgreSQL')


//
const getUserProfile = async (username, password, role = null) => {
    let queryString = `select * from "Users" where username = '${username}' and password = '${password}'`
        + (role ? ` role = '${role}'` : '')

    try {
        const userQueryData = await postgres.query(queryString)

        const userFormattedData = userQueryData?.rowCount >= 1 ? userQueryData?.rows[0] : {}

        return userFormattedData
    }
    catch (err) {
        throw (err)
    }
}

const addNewUser = async (username, password, role = 'user') => {
    let queryString = `insert into "Users" values ('${username}', '${password}', '${role}')`
    try {
        await postgres.query(queryString)
    }
    catch (err) {
        throw err
    }
}

module.exports = {
    getUserProfile,
    addNewUser
}