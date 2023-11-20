const multer = require('multer');
const path = require('path')
// Multer configuration
const dStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where uploaded files will be saved
    },
    filename: function (req, file, cb) {
        const fileFullName = req.fileName + path.extname(file.originalname)
        req.fileName = fileFullName
        cb(null, fileFullName);
    }
});

const upload = multer({ storage: dStorage });


module.exports = upload