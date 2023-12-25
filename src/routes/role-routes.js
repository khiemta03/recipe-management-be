const express = require('express')
const router = express.Router()

const { getRolesController } = require('../controllers/index')
const { validateToken, isSupderAdmin } = require('../middlewares/index')

router
    .get('/', validateToken, isSupderAdmin, getRolesController)


module.exports = router