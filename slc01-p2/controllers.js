const { comparePassword } = require('./helpers/bcrypt')
const { signToken } = require('./helpers/jwt')
const { User, Grocery } = require('./models')

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.create({ email, password })

            delete user.dataValues.password
            delete user.dataValues.createdAt
            delete user.dataValues.updatedAt

            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: "EmailBadReq" }
            if (!password) throw { name: "PassBadReq" }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) throw { name: "LoginError" }

            if (!comparePassword(password, user.password)) throw { name: "LoginError" }

            const payload = {
                id: user.id,
                email: user.email
            }

            const access_token = signToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async read(req, res, next) {
        try {
            const groceries = await Grocery.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            res.status(200).json(groceries)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const { userId } = req.loginInfo
            const { title, price, tag, imageUrl } = req.body

            const grocery = await Grocery.create({ title, price, tag, imageUrl, UserId: userId })

            delete grocery.dataValues.createdAt
            delete grocery.dataValues.updatedAt

            res.status(201).json(grocery)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params

            const grocery = await Grocery.findByPk(id)

            if (!grocery) throw { name: "NotFound" }

            const { title, price, tag, imageUrl } = req.body

            await grocery.update({ title, price, tag, imageUrl })

            res.status(200).json({
                message: "Grocery item has been updated"
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params

            const grocery = await Grocery.findByPk(id)

            if (!grocery) throw { name: "NotFound" }

            await grocery.destroy()

            res.status(200).json({
                message: "Grocery item has been deleted"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller