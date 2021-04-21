

exports.createError = (status, message, originalError='') => {
    return {status, message, originalError}
}
exports.createLazyError = (status, message, originalError='') => {
    return {generalError: {status, message, originalError}}
}
