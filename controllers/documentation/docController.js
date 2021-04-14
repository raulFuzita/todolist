
exports.doc_index_get = (req, res) => {
    res.render('documentation', {session: req.session})
}