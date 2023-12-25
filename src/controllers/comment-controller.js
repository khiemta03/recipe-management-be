const { getComments, addComment, removeComment, updateComment } = require('../queries/index')
const boolean = require('../utils/booleanUtils');


//get comments
const getCommentsController = async (req, res) => {
    try {
        let page = req.query['page'] || 1;
        page = parseInt(page);
        let per_page = req.query['per_page'] || 10;
        per_page = parseInt(per_page);
        
        const sort_by = req.query['sort_by'] || 'newest';
        let recipeId = req.params['recipeId'];
        recipeId = boolean.uuidValidate(recipeId);
        //get comments data
        const commentsData = await getComments(recipeId, page, per_page, sort_by);

        //Response
        if(commentsData.data.length == 0){
            commentsData.message = 'No comments';
        }
        else{
            commentsData.message = 'get comment successfully';
        }
        commentsData.status = 200;
        res.status(200).json(commentsData);
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}



//add comment controller
const addCommentController = async (req, res) => {
    try {
        //get information
        let recipeId = req.params['recipeId'];
        recipeId = boolean.uuidValidate(recipeId);
        const content = req.body.content;
        let userId = req.user.userId;
        userId = boolean.uuidValidate(userId);
        // reply to comment id
        let replyTo = req.body.replyTo; 
        //replyTo = boolean.uuidValidate(replyTo);
        //insert into databse
        await addComment(recipeId, userId, content, replyTo);
        res.json({
            status: 200,
            message: 'add comment successfully'
        });

    }
    catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}



//remove comment controller
const removeCommentController = async (req, res) => {
    try {
        //get comment id
        let commentId = req.params.commentId;
        commentId = boolean.uuidValidate(commentId);
        //get user id
        let userId = req.user.userId;
        userId = boolean.uuidValidate(userId);
        
        //delete from comments
        await removeComment(commentId, userId);
        res.json({
            status: 200,
            message: 'remove comment successfully'
        });

    }
    catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}


//update comment
const updateCommentController = async (req, res) => {
    try {
        //get comment id
        let commentId = req.params.commentId;
        commentId = boolean.uuidValidate(commentId);
        //get user id
        let userId = req.user.userId;
        userId = boolean.uuidValidate(userId);
        //get content
        const newContent = req.body.newContent;
        
        //delete from comments
        await updateComment(commentId, userId, newContent);
        res.json({
            status: 200,
            message: 'update successfully'
        });

    }
    catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}



module.exports = { 
    getCommentsController , addCommentController, removeCommentController, updateCommentController
}
