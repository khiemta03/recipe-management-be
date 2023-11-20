const upload = require('../helpers/multer')

const saveUserAvatar = (req, res, next) => {
    
    req.fileName = req.user.userId
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Lỗi server'
            })
        }
        next()
    })
}


const saveRecipeAvatar = (req, res, next) => {

}


module.exports = {
    saveUserAvatar
}