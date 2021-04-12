const UserDAO = require('../dao/mongoDB/user_dao'),
SettingsDAO = require('../dao/mongoDB/settings_dao'),
util = require('../util/validators'),
jwt = require('jsonwebtoken'),
dotenv = require('dotenv')
dotenv.config()

exports.loadSettings = async (id) => {
    const settingsDAO = new SettingsDAO()
    const settings = await settingsDAO.get(id)
    return settings.find(s => s.settings == 'auth')
}

exports.changeAuthorization = async ({id, email, auth}) => {

    const settingsDAO = new SettingsDAO()
    let token = jwt.sign({id, email}, process.env.API_SECRET)

    if (!auth.enable)
        token = ''

    await settingsDAO.updateAuth({
        id,
        enable: auth.enable || false,
        token
    })
    return token
}

exports.changePassword = async (userObject) => {
    
    const {email, password, confirmPassword} = userObject
    let pwdError

    if(!util.checkPassword(password, confirmPassword))
        pwdError = 'password is not equal'

    const userDAO = new UserDAO()
    const user = await userDAO.getByEmail(email)

    return new Promise((resolve, reject) => {
        if (!pwdError) {
            user.password = util.encrypt(password)
            userDAO.update(user)
            .then(() => resolve(false))
            .catch((error) => reject(error))
        } else {
            reject(pwdError)
        }
    })
}