const express = require('express')
const router = express.Router()
const {getCommentsController, addCommentController} = require('../controllers/index')
const {validateToken} = require('../middlewares/index');


router.get('/:recipeId', getCommentsController);
router.post('/add/:recipeId', validateToken, addCommentController);



module.exports = router;