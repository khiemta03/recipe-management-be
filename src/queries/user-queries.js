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
        throw new Error('Lỗi Server')
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
        throw new Error('Lỗi Server')
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
        throw new Error('Lỗi Server')
    }
}


const deleteUserProfile = async (userId) => {
    let queryString = 'delete from USERS where UserId = $1'
    const values = [userId]
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw new Error('Lỗi Server')
    }
}

const updateUserProfile = async (userId, password, name, email) => {

    const values = [userId];
    const setClauses = [];

    if (password !== null) {
        setClauses.push('password = $2');
        values.push(password);
    }

    if (name !== null) {
        setClauses.push('name = $' + (setClauses.length + 2));
        values.push(name);
    }

    if (email !== null) {
        setClauses.push('email = $' + (setClauses.length + 2));
        values.push(email);
    }

    const queryString = `UPDATE USERS SET ${setClauses.join(', ')} WHERE UserId = $1`;
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw new Error('Lỗi Server')
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
        return formattedData
    }
    catch (err) {
        throw new Error('Lỗi Server')
    }
}

module.exports = {
    getUserProfile,
    addNewUser,
    getAllUsers,
    deleteUserProfile,
    updateUserProfile,
    getNumOfUsers,
}