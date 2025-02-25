const { Game } = require('../models')

class GamesController {
    static async read(req, res, next) {
        try {
            const games = await Game.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            res.status(200).json(games)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const { userId } = req.loginInfo
            const { name, gameImg, releaseDate, developer, genre } = req.body

            const newGame = await Game.create({ name, gameImg, releaseDate, developer, genre, UserId: userId })

            res.status(201).json({
                id: newGame.id,
                name: newGame.name,
                gameImg: newGame.gameImg,
                releaseDate: newGame.releaseDate,
                developer: newGame.developer,
                genre: newGame.genre,
                UserId: newGame.UserId
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const deletedGame = await Game.destroy({
                where: {
                    id: req.params.id
                }
            })

            if (!deletedGame) {
                throw { name: "NotFound" }
            }

            res.status(200).json({
                message: "Game has been deleted"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GamesController