const errorResponse = (res, error, status = false, code = 400) => {
    let sendData = {
        status,
        error
        //'error': 'Internal server error'
    }
    return res.status(code).json(sendData)
}

module.exports = {errorResponse}