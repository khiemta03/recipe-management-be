const postgres = require('../databases/postgreSQL')


const getRoleByRoleId = async (roleId) => {
    let queryString = `select name from roles where roleid = '${roleId}'`;

    try {
        const roleQueryData = await postgres.query(queryString);
        if(roleQueryData.rowCount > 0) {
            return roleQueryData.rows[0].name;
        }
        return '';
    }
    catch(err) {
        throw err;
    }
}


module.exports = {
    getRoleByRoleId
}