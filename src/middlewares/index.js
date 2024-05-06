const { hasToken } = require('./has-token')
const {validateToken} = require('./validate-token')
const {isAdmin} = require('./is-admin')
const {isSupderAdmin} = require('./is-super-admin')


module.exports = {
    hasToken,
    validateToken,
    isAdmin,
    isSupderAdmin
}