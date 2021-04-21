const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const tokenSecret = process.env.API_SECRET || 'token_secret'

exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, tokenSecret, (err, decoded) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })
}