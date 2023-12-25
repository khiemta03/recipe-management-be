const { getUserProfile, getAllUsers, addNewUser, deleteUserProfile, updateUserProfile, getNumOfUsers, getUserCountStatistics, updateUserStatus, updateUserRole } = require('../queries/user-queries')
const { getRoleByRoleId, getAllRoles } = require('../queries/role-queries')
const { uploadFileToGCP } = require('../helpers/gcp')
const { isEmpty } = require('../utils/objectUtils')

const booleanUtils = require('../utils/booleanUtils')
const fs = require('fs').promises
const boolean = require('../utils/booleanUtils');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const getAllUsersController = async (req, res) => {
    try {
        let role = req.query['role']
        role = role ? parseInt(role) : null

        let page = req.query['page']
        page = page ? parseInt(page) : 1

        const keyword = req.query['keyword'] || null

        const status = req.query['status'] || null

        const userCount = await getNumOfUsers({ role, keyword, status })
        let perPage = req.query['per_page'] || userCount
        perPage = parseInt(perPage)

        const sortBy = req.query['sort_by'] || null

        const usersData = await getAllUsers({ page, per_page: perPage, role, status, keyword, sort_by: sortBy })
        for (const user of usersData) {
            const roleId = user.role
            delete user.role
            const roleName = await getRoleByRoleId(roleId)
            user.roles = [roleName]
        }

        res.json({
            status: 200,
            page: page,
            per_page: perPage,
            total_page: userCount % perPage === 0 ? Math.floor(userCount / perPage) : Math.floor(userCount / perPage) + 1,
            user_status: status,
            keyword: keyword,
            sort_by: sortBy,
            role: role,
            data: usersData
        })
    }
    catch (err) {
        res.status(err.status).json({
            status: err.status,
            message: err.message
        })
    }
}

const getUserCountController = async (req, res) => {
    try {
        let role = req.query['role']
        role = role ? parseInt(role) : null

        const keyword = req.query['keyword'] || null

        const status = req.query['status'] || null

        const userCount = await getNumOfUsers({ role, keyword, status })

        res.json({
            status: 200,
            user_status: status,
            keyword: keyword,
            role: role,
            data: {
                count: userCount
            }
        })
    }
    catch (err) {
        res.status(err.status).json({
            status: err.status,
            message: err.message
        })
    }
}

const getUserProfileController = async (req, res) => {
    let id = req.params['id'] || req.user.userId
    try {
        id = boolean.uuidValidate(id);
        const userResData = await getUserProfile({ userId: id })
        const { password, ...userData } = userResData
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
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email || null;
    let name = req.body.name;
    const role = req.body.role || 1
    try {
        username = boolean.usernameValidate(username);
        password = boolean.passwordValidate(password);
        email = boolean.emailValidate(email);
        name = boolean.fullnameValidate(name);
        const userData = await getUserProfile({ username: username })
        if (isEmpty(userData)) {
            //hash password
            password = bcrypt.hashSync(password, saltRounds);

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
    let userId = req.params['id']
    try {
        userId = boolean.uuidValidate(userId);
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
    let userId = req.user.userId
    try {
        userId = boolean.uuidValidate(userId);
        let avatar = null
        if (req.file) {
            req.fileName = userId
            req.folderName = 'UserAvatar'
            avatar = await uploadFileToGCP(req)
        }
        let password = req.body['password'] || null
        //hash password
        if(password) {
            password = bcrypt.hashSync(password, saltRounds);
        }
        
        const name = req.body['name'] || null
        const email = req.body['email'] || null
        await updateUserProfile(userId, password, name, email, avatar)
        res.json({
            status: 200,
            message: 'Cập nhật profile thành công'
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}


const getUserStatisticsController = async (req, res) => {
    let year = req.query['year'] || new Date().getFullYear()
    year = parseInt(year)
    let role = req.query['role']
    role = role ? parseInt(role) : null
    const status = req.query['status'] || null

    try {
        const userCountList = await getUserCountStatistics({ year, role, status })

        return res.json({
            status: 200,
            year: year,
            user_status: status,
            role: role,
            data: userCountList
        })
    }
    catch (err) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        })
    }
}

const updateUserStatusController = async (req, res) => {
    const newStatus = req.body['status']
    const userId = req.params['id']

    try {
        const userData = await getUserProfile({ userId })
        if (isEmpty(userData)) {
            throw {
                status: 400,
                message: 'Người dùng này không tồn tại'
            }
        }

        if (userData.role === 3) {
            throw {
                status: 400,
                message: 'Không thể thay đổi status của super admin'
            }
        }


        if (!booleanUtils.isUserStatusValid(newStatus)) {
            throw {
                status: 400,
                message: 'Trạng thái mới không hợp lệ'
            }
        }

        await updateUserStatus({ userId, newStatus })

        return res.json({
            status: 200,
            message: 'Thay đổi trạng thái thành công'
        })
    }
    catch (err) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        })
    }
}

const updateUserRoleController = async (req, res) => {
    let newRole = req.body['role']
    newRole = newRole ? parseInt(newRole) : null
    const userId = req.params['id']

    try {
        const userData = await getUserProfile({ userId })
        if (isEmpty(userData)) {
            throw {
                status: 400,
                message: 'Người dùng này không tồn tại'
            }
        }

        if (userData.role === 3) {
            throw {
                status: 400,
                message: 'Không thể thay đổi role của super admin'
            }
        }


        const roles = await getAllRoles()
        const isRoleValid = roles.some(role => role.roleid === newRole)
        if (!isRoleValid || newRole === 3) {
            throw {
                status: 400,
                message: 'Role mới không hợp lệ'
            }
        }

        await updateUserRole({ userId, newRole })

        return res.json({
            status: 200,
            message: 'Thay đổi role thành công'
        })
    }
    catch (err) {
        return res.status(err.status).json({
            status: err.status,
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
    getUserCountController,
    getUserStatisticsController,
    updateUserStatusController,
    updateUserRoleController
}