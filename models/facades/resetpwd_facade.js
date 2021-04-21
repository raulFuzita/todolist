const {createLazyError} = require('../util/errors_util')
const UserDAO = require('../dao/mongoDB/user_dao'),
PwdRecoveryDAO = require('../dao/mongoDB/pwd_recovery_dao'),
util = require('../util/validators'),
jwt = require('../../models/util/jwt_verify_token')

exports.resetPassword = (userObject) => {
    
    const {token, password, confirmPassword} = userObject

    return new Promise((resolve, reject) => {

        validateResetRequest(token)
        .then((user) => {

            if(util.checkPassword(password, confirmPassword)) {
                user.password = util.encrypt(password)

                const pwdRecoveryDAO = new PwdRecoveryDAO()
                const userDAO = new UserDAO()

                Promise.all([
                    userDAO.updatePassword(user),
                    pwdRecoveryDAO.updatePwdRecovery({id: user._id, token: '', expirydate: ''})
                ])
                .then(() => resolve(
                    createLazyError('alert-success', 'Password was changed successfully')
                ))
                .catch((error) => reject(error))
            } else {
                reject(createLazyError('alert-danger', 'Password is not equal'))
            }            
        })
        .catch((err) => reject(err))
    })
}

const validateResetRequest = (outsideToken) => {
    return new Promise((resolve, reject) => {
        jwt.verifyToken(outsideToken)
        .then( async ({email}) => {

            const userDAO = new UserDAO()
            const user = await userDAO.getByEmail(email)

            if(!user)
                reject(createLazyError('alert-danger', 'User invalid or does not exist'))

            const {token, expirydate} = user.settings.find(s => s.settings == 'password_recovery')
            const currentTime = new Date()

            if (!token || !expirydate)
                reject(createLazyError('alert-danger', 'Password reset was not requested'))

            if (token != outsideToken || expirydate < currentTime)
                reject(createLazyError('alert-danger', 'Invalid token or it has already expired'))
            
            resolve(user)
        })
        .catch(err => reject(
            createLazyError('alert-danger', 'Invalid token or it has already expired', err)
        ))
    })
}