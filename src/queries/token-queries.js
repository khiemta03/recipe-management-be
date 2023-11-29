const postgres = require('../databases/postgreSQL')

const getToken = async (token) => {
    const queryString = 'select * from TOKENS where TokenValue = $1'
    const values = [token]
    try {
        //delete token out of date
        await clearTOKENS();
        //query to get token
        const tokenQueryData = await postgres.query(queryString, values)
        const formattedData = tokenQueryData.rowCount >= 1 ? tokenQueryData.rows[0] : {}
        return formattedData
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


//add token to table TOKENS
const addToken = async (token) => {
    const queryString = 'insert into TOKENS(TokenValue) values($1)'
    const values = [token]
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


//delete a token
const deleteToken = async(token) => {
    const queryString = 'delete from TOKENS where TokenValue = $1'
    const values = [token]
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


//clear records in TOKENS table
const clearTOKENS = async() => {
    //delete after 2 hours
    const queryString = `delete from tokens
                        where (current_timestamp > (created_time + '2 hours'));`

    try {
        await postgres.query(queryString);
    }
    catch(err) {
        throw new Error('Internal Server Error');
    }
}

module.exports = {
    getToken, addToken, deleteToken ,clearTOKENS
}