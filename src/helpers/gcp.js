const { Storage } = require('@google-cloud/storage')

const storage = new Storage({ keyFilename: 'gcp-key.json' })

const bucket = storage.bucket('recipe-management')
const path = require('path')

const { v4: uuidv4 } = require('uuid')
const uploadFileToGCP = async (req) => {
    const imageBuffer = req.file.buffer;
    const fileName = uuidv4() + path.extname(req.file.originalname);
    const folderName = req.folderName
    try {
        const destination = folderName + '/' + fileName;
        const file = bucket.file(destination);
        await file.save(imageBuffer);
        await file.makePublic();
        return 'https://storage.googleapis.com/recipe-management/' + destination
    } catch (err) {
        throw err
    }
};

module.exports = {
    uploadFileToGCP
}