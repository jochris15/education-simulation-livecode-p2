const express = require('express')
const gamesRouter = express.Router()
const GamesController = require("../controllers/gamesController")
const authorization = require('../middlewares/authorization')

gamesRouter.get('/', GamesController.read)
gamesRouter.post('/', GamesController.create)
gamesRouter.delete('/:id', authorization, GamesController.delete)

module.exports = gamesRouter