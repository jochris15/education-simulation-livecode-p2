const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class AuthController {
    static async register(req, res, next) {
        try {
            const { email, name, password } = req.body
            const newUser = await User.create({ email, name, password })

            res.status(201).json({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: "LoginEmail" }
            if (!password) throw { name: "LoginPassword" }

            const user = await User.findOne({
                where: { email }
            });

            if (!user) throw { name: "LoginError" }

            if (!compare(password, user.password)) {
                throw { name: "LoginError" }
            }

            const payload = { // data2 yang mau kita simpan
                id: user.id,
                email: user.email
            }

            const access_token = signToken(payload)

            res.status(200).json({ access_token });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController