const bcrypt = require("bcryptjs")

const hashPassword = (pass) => {
    return bcrypt.hashSync(pass)
}

const comparePassword = (pass, hashedPass) => {
    return bcrypt.compareSync(pass, hashedPass)
}

module.exports = { hashPassword, comparePassword }