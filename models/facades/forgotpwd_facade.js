const PwdRecoveryDAO = require('../dao/mongoDB/pwd_recovery_dao'),
UserDAO = require('../dao/mongoDB/user_dao'),
mailer = require('../mailer/mailer'),
jwt = require('jsonwebtoken')

exports.requestResetPassword = async (email, resetAtPage) => {

    return new Promise( async (resolve, reject) => {

        const token = await registerRequest(email)

        content = {email, token, resetAtPage}
        const transportObject = prepareEmail(content)

        mailer.sendEmail(transportObject)
        .then((info) => resolve(info))
        .catch((err) => reject(err))

    })
}

const registerRequest = async (email) => {
    const pwdRecoveryDAO = new PwdRecoveryDAO()
    const userDAO = new UserDAO()
    
    const token = jwt.sign({email}, process.env.API_SECRET || 'token_secret')
    let expirydate = new Date()
    expirydate.setMinutes(expirydate.getMinutes() + 35)

    const {id} = await userDAO.getByEmail(email)
    pwdRecovery = {id, token, expirydate}
    await pwdRecoveryDAO.updatePwdRecovery(pwdRecovery)
    return token
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