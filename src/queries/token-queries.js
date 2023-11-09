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

module.exports = {
    getToken, addToken
}