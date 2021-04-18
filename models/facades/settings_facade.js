const UserDAO = require('../dao/mongoDB/user_dao'),
SettingsDAO = require('../dao/mongoDB/settings_dao'),
util = require('../util/validators'),
fs = require('fs'),
jwt = require('jsonwebtoken'),
dotenv = require('dotenv')
dotenv.config()

exports.loadSettings = async (id) => {
    const settingsDAO = new SettingsDAO()
    const settings = await settingsDAO.get(id)
    const auth = settings.find(s => s.settings == 'auth')
    const image = settings.find(s => s.settings == 'image')
    const pathToFile = `storage/images/${image.filename}`
    if (!image.filename || !await checkFileExists(pathToFile))
        image.filename = 'assets/img/profile.png'
    return {auth, image}
}

const checkFileExists = async (file) => {
    return fs.promises.access(file, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false)
}

exports.changeAuthorization = async ({id, email, auth}) => {

    const settingsDAO = new SettingsDAO()
    let token = jwt.sign({id, email}, process.env.API_SECRET || 'todolist')

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
        pwdError = {
            status: 'alert-danger',
            message: 'Password is not equal'
        }

    const userDAO = new UserDAO()
    const user = await userDAO.getByEmail(email)

    return new Promise((resolve, reject) => {

        if (!pwdError) {
            user.password = util.encrypt(password)
            userDAO.updatePassword(user)
            .then(() => resolve({image: {
                status: 'alert-success',
                message: 'Password was changed successfully'
            }}))
            .catch((error) => reject(error))
        } else {
            reject({pwd: pwdError})
        }
    })
}

exports.uploadImage = async (imageObject) => {
    if(`filename` in imageObject === false)
        throw {image: {
            status: 'alert-danger',
            message: 'No picture to upload'
        }}
    const settingsDAO = new SettingsDAO()
    return new Promise((resolve, reject) => {
        settingsDAO.updateImage(imageObject)
        .then(() => resolve({image: {
            status: 'alert-success',
            message: 'Picture was uploaded successfully'
        }}))
        .catch((error) => reject(error))
    })
}

exports.removeImage = async (id) => {
    const settingsDAO = new SettingsDAO()
    const pathToFile = `storage/images/${id}.jpg`
    return new Promise((resolve, reject) => {
        Promise.all([
            checkFileExists(pathToFile),
            fs.promises.unlink(pathToFile),
            settingsDAO.updateImage({id, filename: '', originalname: ''})
        ])
        .then(() => resolve({image: {
            status: 'alert-success',
            message: 'Picture was deleted successfully '
        }}))
        .catch((error) => reject({image: {
            status: 'alert-danger',
            message: 'No picture to delete'
        }}))
    })
}