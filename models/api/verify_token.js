
module.exports = (req, res, next) => {

    const tokenHeader = req.headers['authorization']
    if (typeof tokenHeader !== 'undefined') {
        req.token = tokenHeader
        next()
    } else {
        res.sendStatus(403)
    }
}