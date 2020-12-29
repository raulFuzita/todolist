const logout = (req, res) => {
    req.session.user = null;
    req.session.error = null;
    res.redirect('/');
}

module.exports = {
    logout
}