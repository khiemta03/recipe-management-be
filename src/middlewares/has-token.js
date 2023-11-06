
const { getObjectFromToken } = require('../utils/tokenUtils')

const hasToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        try {
            const obj = getObjectFromToken(token)
            req.username = obj.username
        }
        catch (err) {
            res.status(400).json({
                status: 400,
                message: 'Invalid credentials'
            })
        }
    }
    next()
}


module.exports = {
    hasToken
}