/*
    logout will set session to null and redirect it to the url domain.
    Whatever page or function that depends on a session will work
    with its default state.
*/
exports.logout = (req, res) => {
    req.session.user = null;
    req.session.error = null;
    res.redirect('/')
}