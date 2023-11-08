const { Storage } = require('@google-cloud/storage')

const storage = new Storage({ keyFilename: 'gcp-key.json' })

const bucket = storage.bucket('recipe-management')


const uploadFileToGCP = async (folderName, fileName) => {
    console.log(fileName);
    try {
        const destination = folderName + '/' + fileName;
        await bucket.upload('./uploads/' + fileName, { destination });
        const file = bucket.file(destination);
        await file.makePublic();
        return 'https://storage.googleapis.com/recipe-management/' + destination
    } catch (err) {
        throw err
    }
};

module.exports = {
    uploadFileToGCP
}