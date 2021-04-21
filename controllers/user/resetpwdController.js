const facade = require('../../models/facades/resetpwd_facade')
const { validationResult } = require('express-validator')
const {createLazyError} = require('../../models/util/errors_util')

const render = (req, res, data={}) => {
    const {error, token} = req.session
    const errors = JSON.stringify(error)
    req.session.error = null
    req.session.token = null
    data = {...data, token}
    res.render('resetpassword', {session: req.session, data, errors})
}

exports.reset_pwd_get = (req, res) => {
    render(req, res)
}

exports.reset_pwd_get_param = (req, res) => {
    const {token} = req.params
    req.session.token = token
    res.redirect('/resetpassword')
}

exports.reset_pwd_post = (req, res) => {

    const {token} = req.body
    req.session.token = token

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.session.error = createLazyError(
            'alert-danger', 
            'Password does not meet the requirements')
        render(req, res)
        return
    }

    facade.resetPassword(req.body)
    .then(error =>  {
        req.session.error = error
        render(req, res)
    })
    .catch(error => {
        req.session.error = error
        render(req, res)
    })
}
