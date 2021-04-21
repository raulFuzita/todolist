const forgotPwdFacade = require('../../models/facades/forgotpwd_facade')
const { validationResult } = require('express-validator')
const {createLazyError} = require('../../models/util/errors_util')

exports.forgot_pwd_post = (req, res) => {

    const {email} = req.body
    const resetAtPage = `${req.headers.host}/resetpassword`

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json(createLazyError('alert-danger', 'Email does not meet the requirements'))
        return
    }

    forgotPwdFacade.requestResetPassword(email, resetAtPage)
    .then((info) => {
        res.json('Email was sent')
    })
    .catch((err) => {
        res.json(err)
    })
}