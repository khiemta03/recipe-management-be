const express = require('express')
const router = express.Router()

const {getRolesController} = require('../controllers/index')

router
    .get('/', getRolesController)


module.exports = router