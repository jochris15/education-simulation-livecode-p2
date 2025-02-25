const errorHandler = (error, req, res, next) => {
    let message = 'Internal server error'
    let status = 500

    if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
        message = error.errors[0].message
        status = 400
    }

    if (error.name === 'EmailBadReq') {
        message = 'Email is required'
        status = 400
    }

    if (error.name === 'PassBadReq') {
        message = 'Password is required'
        status = 400
    }

    if (error.name === 'LoginError') {
        message = 'Invalid email/password'
        status = 401
    }

    if (error.name === 'Unauthorized' || error.name === 'JsonWebTokenError') {
        message = "Invalid token"
        status = 401
    }

    if (error.name === 'Forbidden') {
        message = 'You are not authorized'
        status = 403
    }

    if (error.name === 'NotFound') {
        message = "Data not found"
        status = 404
    }


    res.status(status).json({
        message
    })
}

module.exports = errorHandler