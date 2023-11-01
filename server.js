// Main File

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { authRoutes, recipeCategoryRoutes, recipeRoutes } = require('./src/routes/index')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/recipe-categories', recipeCategoryRoutes)
app.use('/api/v1/recipes', recipeRoutes)

app.use('/',(req,res) => {
    res.status(404).json({
        status: 404,
        message: 'Not found'
    })  
})

// server runs at port 3000
const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
