
const jwt = require('jsonwebtoken')


// .env
require('dotenv').config()
const secretKey = process.env.SECRET_KEY


const isTokenValid = (token) => {
    try {
        const obj = jwt.verify(token, secretKey);
        return true;
    }
    catch(err) {
        return false;
    }
}

const generateNewToken = (obj) => {
    try {
        //create token has 2 hours expires
        const newToken = jwt.sign(obj, secretKey, {expiresIn: 7200})
        
        return newToken
    }
    catch (err) {
        throw new Error('Invalid Credentials')
    }
}

const getObjectFromToken = (token) => {
    try {
        const obj = jwt.verify(token, secretKey)
        return obj
    }
    catch (err) {
        throw new Error('Invalid Credentials')
    }
}

module.exports = {
    generateNewToken,
    getObjectFromToken
}