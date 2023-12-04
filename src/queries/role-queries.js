const postgres = require('../databases/postgreSQL')


const getRoleByRoleId = async (roleId) => {
    const queryString = 'select name from roles where roleid = $1';
    const values = [roleId]
    try {
        const roleQueryData = await postgres.query(queryString, values);
        const formattedData = roleQueryData.rowCount > 0 ? roleQueryData.rows[0].name : ''

        return formattedData
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


const getAllRoles = async () => {
    const queryString = 'select * from roles'
    const values = []
    try {
        const roleQueryData = await postgres.query(queryString, values)
        const formattedData = roleQueryData.rowCount > 0 ? roleQueryData.rows : []
        return formattedData
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}

module.exports = {
    getRoleByRoleId,
    getAllRoles
}