
const jwt = require('jsonwebtoken')


// .env
require('dotenv').config()
const secretKey = process.env.SECRET_KEY


const isTokenValid = (token) => {
    try {
        const obj = getObjectFromToken(token);
        return true;
    }
    catch(err) {
        return false;
    }
}

const generateNewToken = (obj) => {
    try {
        const newToken = jwt.sign(obj, secretKey)
        
        return newToken
    }
    catch (err) {
        throw (err)
    }
}

const getObjectFromToken = (token) => {
    try {
        const obj = jwt.verify(token, secretKey)
        return obj
    }
    catch (err) {
        throw(err)
    }
}

module.exports = {
    generateNewToken,
    getObjectFromToken
}