const express = require('express')
const router = express.Router()
const {getCommentsController} = require('../controllers/index')
const {validateToken} = require('../middlewares/index');


router.get('/:recipeId', getCommentsController);



module.exports = router;