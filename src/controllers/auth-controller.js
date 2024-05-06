const { getUserProfile, addNewUser, getRoleByRoleId, addToken, deleteToken } = require('../queries/index')
const { updateUserProfile } = require('../queries/user-queries')
const boolean = require('../utils/booleanUtils');

const bcrypt = require('bcrypt');
const saltRounds = 10;


// ? Utils
const objectUtils = require('../utils/objectUtils')
const tokenUtils = require('../utils/tokenUtils')

// login handler
const loginController = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    try {
        username = boolean.usernameValidate(username);
        password = boolean.passwordValidate(password);
        const userData = await getUserProfile({ username: username })

        if (objectUtils.isEmpty(userData)) {
            // Database dont have this username
            throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác')
        } else if (!bcrypt.compareSync(password, userData.password)) {
            throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác')
        }
        else if (userData.status !== 'Active') {
            //check status
            throw new Error('Tài khoản này đang bị khóa');

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
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let name = req.body.name;
    try {
        username = boolean.usernameValidate(username);
        password = boolean.passwordValidate(password);
        email = boolean.emailValidate(email);
        name = boolean.fullnameValidate(name);
        const userData = await getUserProfile({ username: username })

        if (objectUtils.isEmpty(userData)) {
            // Database dont have this username, so we add it

            //hash password
            password = bcrypt.hashSync(password, saltRounds);

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
const logoutController = async (req, res, next) => {
    const token = req.headers['authorization'];
    try {
        //always true
        if (token) {
            await deleteToken(token);
            res.status(200).json({
                status: 200,
                message: 'Đăng xuất thành công',
            })
        }
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        })
    }
}

const changePasswordController = async (req, res) => {
    const userId = req.user.userId
    const oldPassword = req.body['old-password']
    try {
        const userData = await getUserProfile({ userId })

        if (!bcrypt.compareSync(oldPassword, userData.password)) {
            throw {
                status: 400,
                message: 'Mật khẩu cũ không chính xác'
            }
        }

        let newPassword = req.body['new-password']
        let repeatNewPassword = req.body['repeat-new-password']
        newPassword = boolean.passwordValidate(newPassword)

        if (newPassword !== repeatNewPassword) {
            throw {
                status: 400,
                message: 'Mật khẩu nhập lại không khớp'
            }
        }

        newPassword = bcrypt.hashSync(newPassword, saltRounds)

        await updateUserProfile(userId, newPassword, null, null, null)

        res.json({
            status: 200,
            message: 'Thay đổi mật khẩu thành công'
        })

    }
    catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }

}


module.exports = {
    loginController,
    registerController,
    logoutController,
    changePasswordController
}