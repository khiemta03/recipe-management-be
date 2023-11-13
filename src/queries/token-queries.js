const postgres = require('../databases/postgreSQL')

const getToken = async (token) => {
    const queryString = 'select * from TOKENS where TokenValue = $1'
    const values = [token]
    try {
        const tokenQueryData = await postgres.query(queryString, values)
        const formattedData = tokenQueryData.rowCount >= 1 ? tokenQueryData.rows[0] : {}
        return formattedData
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


//add token to table TOKENS
//table TOKENS has 2 column
const addToken = async (token, iat) => {
    const queryString = 'insert into TOKENS(TokenValue, iat) values($1, $2)'
    const values = [token, iat]
    try {
        await postgres.query(queryString, values)
    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}


//clear records in TOKENS table
const clearTOKENS = async() => {
    const currentTime = (new Date()).getTime()/1000;
    const queryString = 'delete from TOKENS where ($1 - iat) > 3600';
    const values = [currentTime];
    try {
        await postgres.query(queryString, values);
    }
    catch(err) {
        throw new Error('Internal Server Error');
    }
}

module.exports = {
    getToken, addToken, clearTOKENS
}