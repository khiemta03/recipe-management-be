const { getObjectFromToken } = require('../utils/tokenUtils')
const { isEmpty } = require('../utils/objectUtils')
const { getToken, getUserProfile } = require('../queries/index')

const hasToken = async (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        try {
            const tokenData = await getToken(token)
            if (isEmpty(tokenData)) {
                throw new Error('Bạn chưa đăng nhập')
            }
            const obj = getObjectFromToken(token)
            const userData = await getUserProfile({ username: obj.username })
            if (isEmpty(userData)) {
                throw new Error('Bạn chưa đăng nhập')
            }
            req.user = {
                userid: userData.userid,
                username: userData.username,
                role: userData.role
            }
        }
        catch (err) {
            return res.status(400).json({
                status: 400,
                message: err.message
            })
        }
    }
    next()
}


module.exports = {
    hasToken
}