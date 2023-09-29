// Main File

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require('./src/routes/index')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//routes
app.use('/api/v1', router.authRoutes)


// server runs at port 8000
const port = 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
