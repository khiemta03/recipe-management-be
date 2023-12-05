const postgres = require('../databases/postgreSQL')


//get total comment in level 1, don't care about reply comments
const getTotalComments = async(recipeId) => {
    let queryString = `select count(*) as total
                        from comments
                        where recipeid = $1 and replyTo is null`;
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


//get reply comments
const getReplyComments = async (commentId) => {
    const queryString = `select commentId, recipeId ,users.Name, content, datesubmit, users.UserId as userId, avatar, replyto
                        from comments join users on comments.UserId = users.UserId
                        where replyto = $1`;
    const value = [commentId];

    try {
        //query in database
        const data = await postgres.query(queryString, value);
        const result = [];
        if(data.rowCount > 0) {
            const rows = data.rows;
            
            rows.forEach((item)=>{
                result.push({
                    commentId: item.commentid,
                    recipeId: item.recipeid,
                    userId: item.userid,
                    userName: item.name,
                    avatar: item.avatar,
                    content: item.content,
                    dateSubmit: item.datesubmit,
                    replyTo: item.replyto
                })
            })
        }

        return result;
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
                        where recipeid = $1 and replyTo is null
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
            // console.log(rows);
            
            for(item of rows) {
                //get reply comments
                const subComments = await getReplyComments(item.commentid);
                // console.log(subComments);

                result.data.push({
                    commentId: item.commentid,
                    recipeId: item.recipeid,
                    userId: item.userid,
                    userName: item.name,
                    avatar: item.avatar,
                    content: item.content,
                    dateSubmit: item.datesubmit,
                    replyComments: subComments
                })
            }
            console.log(result)
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
const addComment = async (recipeId, userId, content = '', replyTo = null) => {
    // let date = new Date();
    // date = date.toLocaleDateString();

    const queryString = `insert into comments(recipeid, userid, content, replyto)
                        values($1, $2, $3, $4)
                        `;

    const values = [recipeId, userId, content, replyTo];

    try {
        //insert into comments
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
const updateComment = async (commentId, userId ,newContent) => {
    //get date
    let date = new Date();
    date = date.toLocaleDateString();

    const queryString = `update comments 
                        set content = $1, datesubmit = $2
                        where commentid = $3 and userid = $4`;

    const values = [newContent, date, commentId, userId];

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