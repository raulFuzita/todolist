
exports.get_index = (req, res) => {
    res.render('index', {session: req.session})
}