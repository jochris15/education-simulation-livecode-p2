const express = require('express')
const router = express.Router()
const gamesRouter = require('./games')
const AuthController = require('../controllers/authController')
const authentication = require('../middlewares/authentication')
const errorHandlers = require('../middlewares/errorHandlers')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use(authentication)

router.use('/games', gamesRouter)
router.use(errorHandlers)

module.exports = router