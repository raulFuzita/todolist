const crypto = require('crypto')
      dotenv = require('dotenv')
      
dotenv.config()
const secret = process.env.PASSWORD_SECRET || 'encryption_secret' // Secret for the incriptation

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
    return password === confirmPassword
}

module.exports = {
    encrypt,
    validateUser,
    checkPassword,
}