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
    let queryString = `select users.Name, Content, Datesubmit, users.UserId as userId, avatar
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
                const date = new Date(item.datesubmit);
                result.data.push({
                    userId: item.userid,
                    userName: item.name,
                    avatar: item.avatar,
                    content: item.content,
                    dateSubmit: date
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

module.exports = {
    getComments
}