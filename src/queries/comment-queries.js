const postgres = require('../databases/postgreSQL')


const getTotalComments = async(recipeId) => {
    let queryString = `select count(*) as total
                        from comments
                        where recipeid = $1`;
    let values = [recipeId];

    try {
        const data = await postgres.query(queryString, values);
        if(data.rowCount > 0) {
            return data.rows[0].total;
        }
        else {
            return 0;
        }
    }
    catch(err) {
        throw new Error('Internal Server Error');
    }
}


//get comment by recipe's id
const getComments = async (recipeId, page = 1, per_page = 10, sort_by = 'newest') => {
    const order = sort_by === 'oldest' ? 'asc' : 'desc';
    let queryString = `select commentId, recipeId ,users.Name, content, datesubmit, users.UserId as userId, avatar
                        from comments join users on comments.UserId = users.UserId
                        where recipeid = $1
                        order by datesubmit ${order}
                        offset $2
                        limit $3`
    const offset = (page-1)*per_page;
    const limit = per_page;
    
    const values = [recipeId ,offset, limit];

    //query in database
    try {
        const total = Number(await getTotalComments(recipeId));
        let result = {
            total: total,
            page: page,
            per_page: per_page,
            sort_by: sort_by,
            data: []
        }
        //no comment in this recipe
        if(total == 0){
            return result;
        }
        const data = await postgres.query(queryString, values);
        if(data.rowCount > 0) {
            const rows = data.rows;
            
            rows.forEach((item)=>{
                result.data.push({
                    commentId: item.commentid,
                    recipeId: item.recipeid,
                    userId: item.userid,
                    userName: item.name,
                    avatar: item.avatar,
                    content: item.content,
                    dateSubmit: item.datesubmit
                })
            })

            return result;
        }
        else{
            //no comment in this page, per_page
            return result;
        }
    } catch (err) {
        throw new Error('Internal Server Error');
    }
}




//add comment
const addComment = async (recipeId, userId, content = '') => {
    let date = new Date();
    date = date.toLocaleDateString();
    const queryString = `insert into comments(recipeid, userid, content, datesubmit)
                        values($1, $2, $3, $4)
                        `;
    const values = [recipeId, userId, content, date];

    //insert into comments
    try {
        await postgres.query(queryString, values);
    }
    catch(err) {
        throw new Error('Internal Server Error');
    }
}


//remove comment
const removeComment = async (commentId, userId) => {
    // console.log(commentId);
    //delete comment by id
    const queryString = `delete from comments where commentid = $1 and userid = $2`;
    const values = [commentId, userId];

    //delete from table comments
    try {
        await postgres.query(queryString, values);
    }
    catch(err) {
        throw new Error('Internal Server Error');
    }
}


//update a comment with new content
const updateComment = async (recipeId, userId, dateSubmit, newContent) => {
    const queryString = `update comments
                        set content = $1
                        where recipeid = $2 and userid = $3 and datesubmit = $4`;
    const values = [newContent, recipeId, userId, dateSubmit];

    //update new content
    try {
        await postgres.query(queryString, values);
    }
    catch(err) {
        throw new Error('Internal Server Error');
    }
}




module.exports = {
    getComments, addComment, removeComment, updateComment
}