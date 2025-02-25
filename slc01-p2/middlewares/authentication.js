const { verifyToken } = require("../helpers/jwt")

const authentication = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) throw { name: "Unauthorized" }

        const access_token = authorization.split(" ")[1]

        const payload = verifyToken(access_token)

        req.loginInfo = {
            userId: payload.id,
            email: payload.email
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication