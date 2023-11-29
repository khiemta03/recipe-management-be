const { getComments } = require('../queries/index')
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


module.exports = { 
    getCommentsController 
}