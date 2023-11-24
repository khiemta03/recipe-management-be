const { getUserProfile, getAllUsers, addNewUser, deleteUserProfile, updateUserProfile } = require('../queries/user-queries')
const { getRoleByRoleId } = require('../queries/role-queries')
const { uploadFileToGCP } = require('../helpers/gcp')
const { isEmpty } = require('../utils/objectUtils')
const fs = require('fs').promises

const getAllUsersController = async (req, res) => {
    let role = req.query['role'] || 'all'
    role = parseInt(role)
    try {
        const usersData = await getAllUsers(role)
        for (const user of usersData) {
            const roleId = user.role
            delete user.role
            const roleName = await getRoleByRoleId(roleId)
            user.roles = [roleName]
        }

        res.json({
            status: 200,
            data: usersData
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const getUserProfileController = async (req, res) => {
    const id = req.params['id'] || req.user.userId
    try {
        const userResData = await getUserProfile({ userId: id })
        const { username, password, ...userData } = userResData
        const roleId = userData.role
        delete userData.role
        const roleName = await getRoleByRoleId(roleId)
        userData.roles = [roleName]
        res.json({
            status: 200,
            data: userData
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const addNewUserController = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email || null;
    const name = req.body.name;
    const role = req.body.role || 1
    try {
        const userData = await getUserProfile({ username: username })
        if (isEmpty(userData)) {
            await addNewUser(username, password, name, email, role)
            res.json({
                status: 200,
                message: 'Thêm tài khoản thành công'
            })
        } else {
            throw new Error('Username đã tồn tại')
        }

    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}


const deleteUserController = async (req, res) => {
    const userId = req.params['id']
    try {
        await deleteUserProfile(userId)

        res.json({
            status: 200,
            message: 'Xóa tài khoản thành công'
        })
    }

    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const updateUserProfileController = async (req, res) => {
    const userId = req.user.userId

    try {
        let avatar = null
        if (req.file) {
            req.folderName = 'UserAvatar'
            avatar = await uploadFileToGCP(req)
        }
        const password = req.body['password'] || null
        const name = req.body['name'] || null
        const email = req.body['email'] || null
        await updateUserProfile(userId, password, name, email, avatar)
        res.json({
            status: 200,
            message: 'Cập nhật profile thành công'
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}





module.exports = {
    getAllUsersController,
    getUserProfileController,
    addNewUserController,
    deleteUserController,
    updateUserProfileController,
}