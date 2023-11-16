const { getObjectFromToken } = require('../utils/tokenUtils')
const { isEmpty } = require('../utils/objectUtils')
const { getToken, getUserProfile } = require('../queries/index')

const validateToken = async (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        try {
            const tokenData = await getToken(token)
            if (isEmpty(tokenData)) {
                throw new Error('Token không hợp lệ')
            }
            const obj = getObjectFromToken(token)
            const userData = await getUserProfile({ username: obj.username })
            if (isEmpty(userData)) {
                throw new Error('Token không hợp lệ')
            }
            req.user = {
                userId: userData.userid,
                username: userData.username,
                role: userData.role
            }
            next()
        }
        catch (err) {
            return res.status(400).json({
                status: 400,
                message: err.message
            })
        }
    }
    else {
        return res.status(403).json({
            status: 403,
            message: "Bạn không có quyền truy cập vào tài nguyên này"
        })
    }
}


module.exports = {
    validateToken
}