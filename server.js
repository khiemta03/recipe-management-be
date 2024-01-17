// Main File

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { authRoutes, recipeCategoryRoutes, recipeRoutes, userRoutes, roleRoutes, usersRoutes, commentRoutes, ratingRoutes } = require('./src/routes/index')
const cors = require('cors')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}
app.use(cors(corsOptions))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/recipe-categories', recipeCategoryRoutes)
app.use('/api/v1/recipes', recipeRoutes)

app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/rating', ratingRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/roles', roleRoutes)


app.use('/', (req, res) => {
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
