const { getUserProfile, addNewUser, getRoleByRoleId, addToken, deleteToken } = require('../queries/index')


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
            throw new Error('Tên đăng nhập không hợp lệ')
        } else if (userData.password !== password) {
            throw new Error('Mật khẩu không chính xác')
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
                message: 'Đăng nhập thành công',
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
                message: 'Đăng ký thành công',
                role: [role]
            })
        } else {
            // Database has this username
            throw new Error('Tên đăng nhập đã tồn tại')
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



//logout
const logoutController = async(req, res, next) => {
    const token = req.headers['authorization'];
    try {
        //always true
        if(token) {
            await deleteToken(token);
            res.status(200).json({
                status: 200,
                message: 'Đăng xuất thành công',
            })
        }
    }
    catch(err) {
        res.status(400).json({
            status: 400,
            message: err.message
        })
    }
}


module.exports = {
    loginController,
    registerController,
    logoutController
}