const { getComments, addComment, removeComment } = require('../queries/index')
const { isEmpty } = require('../utils/objectUtils')


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

        //insert into databse
        await addComment(recipeId, userId, content);
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
        //get information
        const recipeId = req.params['recipeId'];
        const userId = req.user.userId;
        
        //get date submit, client must attach on request
        const dateSubmit = req.header['dateSubmit'];

        
        //delete from comments
        await removeComment(recipeId, userId, dateSubmit);
        res.json('remove comment successfully');

    }
    catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}


module.exports = { 
    getCommentsController , addCommentController, removeCommentController
}
