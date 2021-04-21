const PwdRecoveryDAO = require('../dao/mongoDB/pwd_recovery_dao'),
UserDAO = require('../dao/mongoDB/user_dao'),
mailer = require('../mailer/mailer'),
jwt = require('jsonwebtoken')
const { createError} = require('../../models/util/errors_util')

exports.requestResetPassword = async (email, resetAtPage) => {

    return new Promise((resolve, reject) => {

        registerRequest(email)
        .then(token => {

            content = {email, token, resetAtPage}
            const transportObject = prepareEmail(content)

            mailer.sendEmail(transportObject)
            .then((info) => resolve(info))
            .catch((err) => reject({
                emailError: createError(
                    'alert-danger', 
                    'Server was unable to send the email, please try it later or contact the support team')
            }))
        })
        .catch((err) => reject(err))
    })
}

const registerRequest = async (email) => {
    const pwdRecoveryDAO = new PwdRecoveryDAO()
    const userDAO = new UserDAO()
    
    const token = jwt.sign({email}, process.env.API_SECRET || 'token_secret')
    let expirydate = new Date()
    expirydate.setMinutes(expirydate.getMinutes() + 35)

    return new Promise((resolve, reject) => {
        userDAO.getByEmail(email)
        .then(async (user) => {
            if (user) {
                pwdRecovery = {id: user.id, token, expirydate}
                await pwdRecoveryDAO.updatePwdRecovery(pwdRecovery)
                resolve(token)
            }
            reject({
                emailError: createError(
                    'alert-danger', 'Nonexistent user, please enter a registered email account.')
            })
        })
        .catch(err => reject({
            emailError: createError(
                'alert-danger', 'Server could not respond, please try later or contact support team')
        }))
    })
}

const prepareEmail = (content) => {

    const {resetAtPage, token, email} = content

    return {
        to: email,
        subject: 'Password reset was requested',
        html: '<h1>Reset Password Requested</h1>'
        + '<p>Please click on the link below to reset your passowrd. This token is valid only for 30 minutes</p>'
        + `<a href="${resetAtPage}/${token}">reset password</a>`
    }
}