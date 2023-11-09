const { getUserProfile, getAllUsers, addNewUser, deleteUserProfile, updateUserProfile } = require('../queries/user-queries')
const { uploadFileToGCP } = require('../helpers/index')


const getAllUsersController = async (req, res) => {
    let role = req.query['role'] || '1'
    role = parseInt(role)
    try {
        const usersData = await getAllUsers(role)

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
    console.log(id)
    try {
        const userResData = await getUserProfile({ userId: id })
        const { username, password, ...userData } = userResData
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
    const email = req.body.email;
    const name = req.body.name;
    const role = req.body.role
    const avatar = req.body.avatar || null

    try {
        await addNewUser(username, password, name, email, role, avatar)

    }
    catch (err) {
        throw new Error('Internal Server Error')
    }
}

const deleteUserController = async (req, res) => {
    const id = req.body.userId
    try {

    }

    catch(err) {

    }
}

const updateUserProfileController = async (req, res) => {
    const userId = req.body.userId
}

module.exports = {
    getAllUsersController,
    getUserProfileController,
    addNewUserController,
    deleteUserController,
    updateUserProfileController
}