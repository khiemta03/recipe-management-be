const express = require('express')
const router = express.Router()
const {getCommentsController, addCommentController, removeCommentController, updateCommentController} = require('../controllers/index')
const {validateToken} = require('../middlewares/index');


router.get('/:recipeId', getCommentsController);
router.post('/add/:recipeId', validateToken, addCommentController);
router.delete('/:commentId', validateToken, removeCommentController);
router.put('/:commentId', validateToken, updateCommentController);



module.exports = router;