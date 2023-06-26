const errorResponse = (error, status = false, code) => {
    let sendData = {
        status,
        error
    }
    return res.status(code).json(sendData)
}

module.exports = {errorResponse}