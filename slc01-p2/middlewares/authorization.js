const { Grocery } = require('../models')

const authorization = async (req, res, next) => {
    try {
        const { userId } = req.loginInfo
        const { id } = req.params

        const grocery = await Grocery.findByPk(id)
        if (!grocery) throw { name: "NotFound" }

        if (grocery.UserId !== userId) throw { name: "Forbidden" }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization