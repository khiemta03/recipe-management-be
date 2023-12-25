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


const getAllUsers = async ({ page, per_page, role, status, keyword, sort_by }) => {
    let queryString = 'select * from USERS where 1 = 1'
    let setClauses = [];
    let values = [(page - 1) * per_page, per_page]
    if (status) {
        setClauses.push(' and status = $' + (setClauses.length + 3));
        values.push(status)
    }

    if (keyword) {
        setClauses.push(' and LOWER(name) like LOWER($' + (setClauses.length + 3) + ')')
        values.push(`%${keyword}%`)
    }

    if (role) {
        setClauses.push(' and role = $' + (setClauses.length + 3))
        values.push(role)
    }
    else {
        queryString += ' and role != 3'
    }

    queryString += setClauses.join(' ')


    queryString += sort_by === 'date' ? '\norder by Created_Date Desc' : ''
    queryString += '\noffset $1\nlimit $2'

    try {
        const usersQueryData = await postgres.query(queryString, values);
        const usersData = usersQueryData.rowCount >= 1 ? usersQueryData.rows : []
        const formattedData = usersData.map(({ username, password, ...rest }) => rest)
        return formattedData
    }
    catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}


const deleteUserProfile = async (userId) => {
    let queryString = 'delete from USERS where UserId = $1'
    const values = [userId]
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const updateUserProfile = async (userId, password, name, email, avatar) => {

    let values = [userId];
    let setClauses = [];

    if (password) {
        setClauses.push('password = $2');
        values.push(password);
    }

    if (name) {
        setClauses.push('name = $' + (setClauses.length + 2));
        values.push(name);
    }

    if (email) {
        setClauses.push('email = $' + (setClauses.length + 2));
        values.push(email);
    }

    if (avatar) {
        setClauses.push('avatar = $' + (setClauses.length + 2));
        values.push(avatar);
    }

    const queryString = `UPDATE USERS SET ${setClauses.join(', ')} WHERE UserId = $1`;
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}


const getNumOfUsers = async ({ role, keyword, status }) => {
    let queryString = 'select count(*) from Users where 1 = 1'

    let values = []
    let setClauses = []
    if (role) {
        setClauses.push(' and Role = $' + (setClauses.length + 1))
        values.push(role)
    } else {
        queryString += ' and role != 3'
    }

    if (keyword) {
        setClauses.push(' and LOWER(name) like LOWER($' + (setClauses.length + 1) + ')')
        values.push(`%${keyword}%`)
    }

    if (status) {
        setClauses.push(' and Status = $' + (setClauses.length + 1))
        values.push(status)
    }

    queryString += setClauses.join(' ')

    try {
        const data = await postgres.query(queryString, values)
        const formattedData = parseInt(data.rows[0].count)
        return formattedData
    }
    catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const getUserCountStatistics = async ({ year, role, status }) => {
    let queryString = `WITH RECURSIVE months_series AS (
        SELECT 1 AS month
        UNION
        SELECT month + 1
        FROM months_series
        WHERE month < 12
        )
        SELECT ms.month AS month,
            CAST(COALESCE(COUNT(u.userId), 0) AS INTEGER) AS num_users
        FROM months_series ms
        LEFT JOIN
            users u ON EXTRACT(MONTH FROM u.created_date) = ms.month AND EXTRACT(YEAR FROM u.created_date) = $1

      `
    let values = [year]
    let setClauses = []

    if (status) {
        setClauses.push(' and u.Status = $' + (setClauses.length + 2))
        values.push(status)
    }

    if (role) {
        setClauses.push(' and u.role = $' + (setClauses.length + 2))
        values.push(role)
    } else {
        queryString += ' and u.Role != 3'
    }

    queryString += setClauses.join(' ')

    queryString += `
    GROUP BY
        ms.month
    ORDER BY
        ms.month;`

    try {
        const countList = await postgres.query(queryString, values)
        const formattedData = countList.rowCount > 0 ? countList.rows : []
        return formattedData
    } catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const updateUserStatus = async ({ userId, newStatus }) => {
    const queryString = 'update users set status = $1 where userId = $2'
    const values = [newStatus, userId]

    try {
        await postgres.query(queryString, values)
        return true
    }
    catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const updateUserRole = async ({ userId, newRole }) => {
    const queryString = 'update users set role = $1 where userId = $2'
    const values = [newRole, userId]

    try {
        await postgres.query(queryString, values)
        return true
    }
    catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

module.exports = {
    getUserProfile,
    addNewUser,
    getAllUsers,
    deleteUserProfile,
    updateUserProfile,
    getNumOfUsers,
    getUserCountStatistics,
    updateUserStatus,
    updateUserRole
}