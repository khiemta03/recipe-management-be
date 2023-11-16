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

const getAllUsers = async (role = 'all') => {
    let queryString = 'select * from USERS'
    if (role === 1) {
        queryString += '\nwhere role = 1'
    }
    else if (role === 2) {
        queryString += '\nwhere role = 2'
    }
    else {
        queryString += '\nwhere role = 1 or role = 2'
    }
    try {
        const usersQueryData = await postgres.query(queryString);
        const usersData = usersQueryData.rowCount >= 1 ? usersQueryData.rows : []
        const formattedData = usersData.map(({ username, password, ...rest }) => rest)
        return formattedData
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


const deleteUserProfile = async (userId) => {
    let queryString = 'delete from USERS where UserId = $1'
    const values = [userId]
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}

const updateUserProfile = async (userId) => {
    const queryString = 'update USERS\nset'
    const values = [userId]
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


const getNumOfUsers = async (role = 'all') => {
    let queryString = 'select count(*) from Users'
    if (role === 1) {
        queryString += '\nwhere role = 1'
    }
    else if (role === 2) {
        queryString += '\nwhere role = 2'
    }
    else {
        queryString += '\nwhere role = 1 or role = 2'
    }

    try {
        const data = await postgres.query(queryString)
        const formattedData = parseInt(data.rows[0].count)
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}

module.exports = {
    getUserProfile,
    addNewUser,
    getAllUsers,
    deleteUserProfile,
    updateUserProfile,
    getNumOfUsers
}