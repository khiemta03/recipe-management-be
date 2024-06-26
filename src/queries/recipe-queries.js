const postgres = require('../databases/postgreSQL')

const getRecipes = async (page, per_page, sort_by, category, status = 'Approved', keyword) => {

    let queryString = `select RECIPES.*, CATEGORIES.Name AS category , COALESCE(ROUND(AVG(rating.rating), 1), 0)::float AS averagerating, COUNT(rating.rating)::integer AS reviews
                        \nfrom RECIPES left join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nleft join RATING on RECIPES.RecipeId = RATING.RecipeId
                        \nleft join USERS on RECIPES.Author = USERS.UserId
                        \nwhere RECIPES.Status != 'Deleted' and USERS.Status = 'Active' `
    let values = [(page - 1) * per_page, per_page, status]
    if (category !== 'all') {
        queryString += '\nand CATEGORIES.CategoryId = $4'
        values.push(category)
    }

    if (keyword) {
        if (category !== 'all') {
            queryString += '\nand LOWER(RECIPES.Name) like LOWER($5)'
        } else {
            queryString += '\nand LOWER(RECIPES.Name) like LOWER($4)'
        }
        values.push(`%${keyword}%`)
    }

    queryString += "\nand RECIPES.status = $3"
    queryString += '\ngroup by RECIPES.RecipeId, CATEGORIES.Name, USERS.UserId'
    queryString += sort_by === 'date' ? '\norder by DateSubmit Desc' : ''
    queryString += sort_by === 'rating' ? '\norder by AVG(rating.rating) Desc nulls last' : ''
    queryString += '\noffset $1\nlimit $2'

    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows : []
        return formattedData
    } catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const getRecipe = async (recipeId) => {
    const queryString = `select RECIPES.*, CATEGORIES.Name AS category, COALESCE(ROUND(AVG(rating.rating), 1), 0)::float AS averagerating, COUNT(rating.rating)::integer AS reviews
                        \nfrom RECIPES left join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nleft join RATING on RECIPES.RecipeId = RATING.RecipeId
                        \nleft join USERS on RECIPES.Author = USERS.UserId
                        \nwhere RECIPES.RecipeId = $1 and RECIPES.Status != 'Deleted' and USERS.Status = 'Active'
                        \ngroup by RECIPES.RecipeId, CATEGORIES.Name `
    const values = [recipeId]
    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows[0] : {}
        return formattedData
    }
    catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const getNumOfRecipes = async (category = 'all', status = 'Approved', keyword, year, userId) => {

    let queryString = `select count(*)
                        \nfrom RECIPES left join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nleft join USERS on RECIPES.Author = USERS.UserId
                        \nwhere RECIPES.Status != 'Deleted' and USERS.Status = 'Active'`
    let values = [status]
    let setClauses = []
    if (category !== 'all') {
        setClauses.push('\nand CATEGORIES.CategoryId = $' + (setClauses.length + 2))
        values.push(category)
    }

    if (keyword) {
        setClauses.push('\nand LOWER(RECIPES.Name) like LOWER($' + (setClauses.length + 2) + ')')
        values.push(`%${keyword}%`)
    }

    if (year) {
        setClauses.push('\nand EXTRACT(YEAR FROM RECIPES.datesubmit) = $' + (setClauses.length + 2))
        values.push(year)
    }

    if (userId) {
        setClauses.push('\nand USERS.UserId = $' + (setClauses.length + 2))
        values.push(userId)
    }
    queryString += setClauses.join(' ')

    queryString += "\nand RECIPES.status = $1"
    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = parseInt(recipeData.rows[0].count)
        return formattedData
    } catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const getRecipesOfUser = async (userId, page, per_page, sort_by, category, status, keyword) => {
    let queryString = `select RECIPES.*, CATEGORIES.Name AS category , COALESCE(ROUND(AVG(rating.rating), 1), 0)::float AS averagerating, COUNT(rating.rating)::integer AS reviews
                        \nfrom RECIPES left join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId
                        \nleft join RATING on RECIPES.RecipeId = RATING.RecipeId
                        \nleft join USERS on RECIPES.Author = USERS.UserId
                        \nwhere USERS.Status = 'Active' and RECIPES.Author = $3 and RECIPES.Status != 'Deleted' `
    let values = [(page - 1) * per_page, per_page, userId]
    let setClauses = []
    if (category !== 'all') {
        setClauses.push('and CATEGORIES.CategoryId = $' + (setClauses.length + 4))
        values.push(category)
    }

    if (keyword) {
        setClauses.push(' and LOWER(RECIPES.Name) like LOWER($' + (setClauses.length + 4) + ')')
        values.push(`%${keyword}%`)
    }

    if (status) {
        setClauses.push(' and RECIPES.Status = $' + (setClauses.length + 4))
        values.push(status)
    } else {
        setClauses.push(" and RECIPES.Status != 'Delete'")
    }

    queryString += setClauses.join(' ')

    queryString += '\ngroup by RECIPES.RecipeId, CATEGORIES.Name'
    queryString += sort_by === 'date' ? '\norder by DateSubmit Desc' : ''
    queryString += sort_by === 'rating' ? '\norder by AVG(rating.rating) Desc nulls last' : ''
    queryString += '\noffset $1\nlimit $2'

    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = recipeData.rowCount > 0 ? recipeData.rows : []
        return formattedData
    } catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const getUserRecipeCount = async (userId, category, status, keyword) => {
    let queryString = `select count(*)
                        \nfrom RECIPES left join CATEGORIES on RECIPES.Category = CATEGORIES.CategoryId 
                        \nleft join USERS on RECIPES.Author = USERS.UserId
                        \nwhere USERS.Status = 'Active' and RECIPES.Author = $1 and RECIPES.Status != 'Deleted'`
    let values = [userId]
    let setClauses = []
    if (category !== 'all') {
        setClauses.push('and CATEGORIES.CategoryId = $2')
        values.push(category)
    }

    if (keyword) {
        setClauses.push(' and LOWER(RECIPES.Name) like LOWER($' + (setClauses.length + 2) + ')')
        values.push(`%${keyword}%`)
    }

    if (status) {
        setClauses.push(' and RECIPES.Status = $' + (setClauses.length + 2))
        values.push(status)
    } else {
        setClauses.push(" and RECIPES.Status != 'Delete'")
    }

    queryString += setClauses.join(' ')
    try {
        const recipeData = await postgres.query(queryString, values)
        const formattedData = parseInt(recipeData.rows[0].count)
        return formattedData
    } catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

const addNewRecipe = async ({ userId, name, description, estimatedTime, ingredients, instruction, category, avatar }) => {
    const queryString = `insert into RECIPES(name, author, description, estimatedtime, ingredients, instruction, category, recipeavatar)
                        \nvalues($1, $2, $3, $4, $5, $6, $7, $8) returning recipeid`
    const values = [name, userId, description, estimatedTime, ingredients, instruction, category, avatar]

    try {
        const resData = await postgres.query(queryString, values)
        const formattedData = resData.rows[0].recipeid
        return formattedData
    } catch (err) {
        throw new Error('Lỗi server')
    }
}

const updateRecipe = async ({ recipeId, name, description, estimatedTime, ingredients, instruction, category, avatar }) => {
    let values = [recipeId]
    let setClauses = []
    if (name) {
        setClauses.push('Name = $2')
        values.push(name)
    }

    if (description) {
        setClauses.push('Description = $' + (setClauses.length + 2))
        values.push(description)
    }

    if (estimatedTime) {
        setClauses.push('estimatedtime = $' + (setClauses.length + 2))
        values.push(estimatedTime)
    }

    if (ingredients) {
        setClauses.push('Ingredients = $' + (setClauses.length + 2))
        values.push(ingredients)
    }

    if (instruction) {
        setClauses.push('Instruction = $' + (setClauses.length + 2))
        values.push(instruction)
    }

    if (category) {
        setClauses.push('Category = $' + (setClauses.length + 2))
        values.push(category)
    }

    if (avatar) {
        setClauses.push('RecipeAvatar = $' + (setClauses.length + 2))
        values.push(avatar)
    }

    const queryString = `update RECIPES set ${setClauses.join(' , ')} where RecipeId = $1`
    try {
        await postgres.query(queryString, values)

    } catch (err) {
        throw {
            status: 500,
            message: 'Lỗi server'
        }
    }
}

const changeRecipeStatus = async ({ recipeId, newStatus, approvedBy }) => {
    let queryString = 'update RECIPES set status = $1 '
    let values = [newStatus, recipeId]
    if (approvedBy) {
        queryString += ', approved = $3 '
        values.push(approvedBy)
    }
    queryString += 'where RecipeId = $2'
    try {
        await postgres.query(queryString, values)

    } catch (err) {
        throw {
            status: 500,
            message: 'Lỗi server'
        }
    }
}


const getRecipeCountStatistics = async ({ year, category, status, userId }) => {
    let queryString = `WITH RECURSIVE months_series AS (
        SELECT 1 AS month
        UNION
        SELECT month + 1
        FROM months_series
        WHERE month < 12
        )
        SELECT ms.month AS month,
            CAST(COALESCE(COUNT(r.recipeid), 0) AS INTEGER) AS num_recipes
        FROM months_series ms
        LEFT JOIN
            recipes r ON EXTRACT(MONTH FROM r.datesubmit) = ms.month `
    let values = []
    let setClauses = []
    if (year) {
        setClauses.push('and EXTRACT(YEAR FROM r.datesubmit) = $' + (setClauses.length + 1))
        values.push(year)
    }

    if (category) {
        setClauses.push('and r.Category = $' + (setClauses.length + 1))
        values.push(category)
    }

    if (status) {
        setClauses.push(' and r.Status = $' + (setClauses.length + 1))
        values.push(status)
    }

    if (userId) {
        setClauses.push(' and r.author = $' + (setClauses.length + 1))
        values.push(userId)
    }

    queryString += setClauses.join(' ')

    queryString += `
    GROUP BY
        ms.month
    ORDER BY
        ms.month;`

    try {
        const countList = await postgres.query(queryString, values)
        const formattedData = countList.rowCount > 0 ? countList.rows : []
        return formattedData
    } catch (err) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    }
}

module.exports = {
    getRecipes,
    getRecipe,
    getNumOfRecipes,
    getRecipesOfUser,
    getUserRecipeCount,
    addNewRecipe,
    updateRecipe,
    changeRecipeStatus,
    getRecipeCountStatistics
}