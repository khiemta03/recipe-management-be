const { verify } = require('jsonwebtoken')
const {getUserProfile, addNewUser} = require('../queries/index')


// ? Utils
const objectUtils = require('../utils/objectUtils')
const tokenUtils = require('../utils/tokenUtils')

// login handler
const loginController = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const userData = await getUserProfile(username, password)

        if (objectUtils.isEmpty(userData)) {
            // Database dont have this username
            throw new Error('Invalid credentials')
        } else {
            // Database has this username, so we send a success message with a token
            const token = tokenUtils.generateNewToken({
                username: username
            })
            res.status(200).json({
                token: token,
                message: 'Login successfully'
            })
        }
    }
    // Handle errors
    catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}

// register
const registerController = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const userData = await getUserProfile(username, password)

        if (objectUtils.isEmpty(userData)) {
            // Database dont have this username, so we add it
            await addNewUser(username, password)

            const token = tokenUtils.generateNewToken({
                username: username
            })
            
            // return a success message along with a token
            res.status(200).json({
                token: token,
                message: 'Sign up successfully'
            })
        } else {
            // Database has this username
            throw new Error('Username is exists')
        }
    }
    catch (err) {
        // Handle errors
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = {
    loginController,
    registerController
}