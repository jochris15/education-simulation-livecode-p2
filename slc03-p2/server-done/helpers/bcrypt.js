const bcrypt = require('bcryptjs')

const hash = (pw) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pw, salt)
}

const compare = (pw, hashedPw) => {
    return bcrypt.compareSync(pw, hashedPw)
}

module.exports = { hash, compare }