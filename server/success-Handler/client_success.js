const successResponse = (res, message, data, code = 200, status = true) => {
    let sendData = {
        data,
        status,
        message,
    }
    return res.status(code).json(sendData)
}

module.exports = {successResponse}