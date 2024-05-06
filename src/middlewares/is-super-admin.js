


const isSupderAdmin = async (req, res, next) => {
    if (req.user.role === 3) {
        next()
    } else {
        res.status(403).json({
            status: 403,
            message: "Bạn không có quyền truy cập vào tài nguyên này"
        })
    }
}

module.exports = {
    isSupderAdmin
}