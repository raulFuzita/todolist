const SettingsDAO = require('../dao/mongoDB/settings_dao')

exports.isValidToken = async (checkToken, userID) => {
    const settingsDAO = new SettingsDAO()
    
    const settings = await settingsDAO.get(userID)
    const {token} = settings.find(s => s.settings == 'auth')
    return new Promise((resolve, reject) => {
        token && token == checkToken ? resolve(true) : reject(false)
    })
}