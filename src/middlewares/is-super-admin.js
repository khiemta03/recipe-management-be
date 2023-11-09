


const isSupderAdmin = async (req, res, next) => {
    if (req.user.role === 3) {
        next()
    } else {
        res.status(403).json({
            status: 403,
            message: "You don't have permission to access this resource"
        })
    }
}

module.exports = {
    isSupderAdmin
}