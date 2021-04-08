const SettingsDAO = require('../../models/dao/mongoDB/settings_dao')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.setting_index_get = async (req, res) => {

    const settingsDAO = new SettingsDAO()
    const {id} = req.session.user
    const settings = await settingsDAO.get(id)
    const auth = settings.find(s => s.settings == 'auth')

    res.render('settings', {
        session: req.session, 
        email: req.session.email,
        auth
    })
}

exports.setting_update = async (req, res) => {

    const settingsDAO = new SettingsDAO()
    const {id, email} = req.session.user
    const {auth} = req.body

    let token = jwt.sign({id, email}, process.env.API_SECRET)

    if (!auth.enable)
        token = ''

    await settingsDAO.updateAuth({
        id,
        enable: auth.enable || false,
        token
    })
    res.json({token})
}
