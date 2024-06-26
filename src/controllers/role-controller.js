const { getAllRoles } = require('../queries/index')


const getRolesController = async (req, res) => {
    try {
        const roleData = await getAllRoles()
        res.json({
            status: 200,
            data: roleData
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}


module.exports = {
    getRolesController
}