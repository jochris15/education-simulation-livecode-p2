const { User, Game } = require('../models')
const authorization = async (req, res, next) => {
    try {
        const { userId } = req.loginInfo
        const { id } = req.params

        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw { name: "NotFound" }
        }

        const game = await Game.findByPk(id)

        if (!game) {
            throw { name: "NotFound" }
        }

        if (user.id !== game.UserId) {
            throw { name: "Forbidden" }
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization