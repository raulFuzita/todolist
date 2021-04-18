const UserDAO = require('../../models/dao/mongoDB/user_dao'),
User = require('../../models/user/user'),
util = require('../util/validators')

exports.login = async (userForm) => {

    const userDAO = new UserDAO()
    const user = await userDAO.getByEmail(userForm.email.trim())

    return new Promise((resolve, reject) => {
        if(user){
            if (util.validateUser(user, userForm)){
                resolve({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
            }
        }
        reject({form: {
            status: 'alert-danger',
            message: 'User does not exist'
        }})
    })
}

exports.signup = async (userForm) => {

    const userDAO = new UserDAO()
    const {name, email, password, confirmPassword} = userForm
    let pwdError, emailError

    if(!util.checkPassword(password, confirmPassword))
        pwdError = {
            status: 'alert-danger',
            message: 'Password is not equal'
        }
    
    if (await userDAO.getByEmail(email))
        emailError = {
            status: 'alert-danger',
            message: 'User already exist'
        }

    return new Promise((resolve, reject) => {
        if (!pwdError && !emailError){
            let user = new User() // Creates a user object
            // encrypts the password according to sha256 and the secret word.
            let passwordHash = util.encrypt(password.trim())
            // Sets user object properties
            user.setName(name.trim())
                .setEmail(email.trim())
                .setPassword(passwordHash)
                .setSettings({settings: 'auth', enable: false, token: ''})
                .setSettings({settings: 'image', filename: '', originalname: ''})
            // Checks if a user already exists. Otherwise a user is created.
            userDAO.set(user)
            resolve(email)
        } else {
            reject({
                formCache: {name, email},
                error: {pwdError, emailError}
            })
        }
    })
}
