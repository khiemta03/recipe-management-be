const { getUserProfile, addNewUser, getRoleByRoleId, addToken } = require('../queries/index')


// ? Utils
const objectUtils = require('../utils/objectUtils')
const tokenUtils = require('../utils/tokenUtils')

// login handler
const loginController = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const userData = await getUserProfile({ username: username })

        if (objectUtils.isEmpty(userData)) {
            // Database dont have this username
            throw new Error('Invalid credentials')
        } else if (userData.password !== password) {
            throw new Error('Invalid credentials')
        }
        else {
            // Database has this username, so we send a success message with a token
            const token = tokenUtils.generateNewToken({
                username: username
            })

            await addToken(token)

            const role = await getRoleByRoleId(userData.role);
            userData.role = role;
            res.status(200).json({
                accessToken: token,
                status: 200,
                message: 'Login successfully',
                roles: [userData.role]
            })
        }
    }
    // Handle errors
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        })
    }
}

// register
const registerController = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;


    try {
        const userData = await getUserProfile({ username: username })

        if (objectUtils.isEmpty(userData)) {
            // Database dont have this username, so we add it
            await addNewUser(username, password, name, email);
            const token = tokenUtils.generateNewToken({
                username: username
            });
            await addToken(token)
            //by default register: role is user
            const role = await getRoleByRoleId(1);

            // return a success message along with a token
            res.status(200).json({
                status: 200,
                accessToken: token,
                message: 'Sign up successfully',
                role: [role]
            })
        } else {
            // Database has this username
            throw new Error('Username is exists')
        }
    }
    catch (err) {
        // Handle errors
        res.status(400).json({
            status: 400,
            message: err.message
        })
    }
}

module.exports = {
    loginController,
    registerController
}