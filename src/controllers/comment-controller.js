const { getComments, addComment, removeComment, updateComment } = require('../queries/index')



//get comments
const getCommentsController = async (req, res) => {
    try {
        let page = req.query['page'] || 1;
        page = parseInt(page);
        let per_page = req.query['per_page'] || 10;
        per_page = parseInt(per_page);
        
        const sort_by = req.query['sort_by'] || 'newest';
        const recipeId = req.params['recipeId'];

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
        const recipeId = req.params['recipeId'];
        const content = req.body.content;
        const userId = req.user.userId;

        // reply to comment id
        const replyTo = req.body.replyTo; 

        //insert into databse
        await addComment(recipeId, userId, content, replyTo);
        res.json('add comment successfully');

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
        const commentId = req.params.commentId;
        //get user id
        const userId = req.user.userId;
        
        //delete from comments
        await removeComment(commentId, userId);
        res.json('remove comment successfully');

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
        const commentId = req.params.commentId;
        //get user id
        const userId = req.user.userId;
        //get content
        const newContent = req.body.newContent;
        
        //delete from comments
        await updateComment(commentId, userId, newContent);
        res.json('update successfully');

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
