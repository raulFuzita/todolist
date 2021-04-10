const crypto = require('crypto')
const UserDAO = require('../../models/dao/mongoDB/user_dao')
const User = require('../../models/user/user')
const dotenv = require('dotenv')

dotenv.config()
const secret = process.env.PASSWORD_SECRET || 'encryption_secret' // Secret for the incriptation

exports.login = async (userForm) => {

    const userDAO = new UserDAO()
    const user = await userDAO.getByEmail(userForm.email.trim())

    return new Promise((resolve, reject) => {
        if(user){
            if (validateUser(user, userForm)){
                resolve({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
            }
        }
        reject('user doesn\'t exist yet')
    })
}

exports.signup = async (userForm) => {

    const userDAO = new UserDAO()
    const {name, email, password, confirmPassword} = userForm
    let pwdError, emailError

    if(!checkPassword(password, confirmPassword))
        pwdError = 'password is not equal'
    
    if (await userDAO.getByEmail(email))
        emailError = 'user already exist'

    return new Promise((resolve, reject) => {
        if (!pwdError && !emailError){
            let user = new User() // Creates a user object
            // encrypts the password according to sha256 and the secret word.
            let passwordHash = encrypt(password.trim())
            // Sets user object properties
            user.setName(name.trim())
                .setEmail(email.trim())
                .setPassword(passwordHash)
                .setSettings({settings: 'auth', enable: false, token: ''})
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

const encrypt = (val) => {
    return crypto.createHmac('sha256', secret).update(val).digest('hex')
}

/**
 * This function will encrypt the second parameter password and be put against the first one.
 * If they are equal it returns true. Otherwise false.
 * @param {Object} user1 - It's expected object has password property.
 * @param {Object} user2 - It's expected object has password property.
 */
 const validateUser = (user1, user2) => {
    let passwordHash = encrypt(user2.password.trim())
    return user1.password === passwordHash
}

/**
 * This function takes an object that has password and confirmPassword property.
 * Both password will be validated by size and checked if they are euqual.
 * Returns true if all requirement are true. Otherwise false.
 * @param {Object} userForm - It's expected the object has password and confirmPassword property.
 * @returns boolean
 */
 const checkPassword = (password, confirmPassword) => {
    return validateSize(password) && validateSize(confirmPassword) && password === confirmPassword
}

/**
 * This function will check if a password is bigger or equal to 8 characters 
 * and smaller or equal to 160 characters.
 * Returns true if password is according to the range. Otherwise false.
 * @param {string} password - User's password
 * @returns boolean
 */
const validateSize = (password) => {
    return password.length >= 8 && password.length <= 160
}