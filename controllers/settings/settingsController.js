const settingsFacade = require('../../models/facades/settings_facade')

const getAllSettings = async (req, res, error=null) => {
    const {id} = req.session.user
    const auth = await settingsFacade.loadSettings(id)
    res.render('settings', {session: req.session, auth, error})
}

exports.setting_index_get = async (req, res) => {
    getAllSettings(req, res)
}

exports.setting_update = async (req, res) => {
    const {id, email} = req.session.user
    const {auth} = req.body
    const token = await settingsFacade.changeAuthorization({id, email, auth})
    res.json({token})
}

exports.setting_post = async (req, res) => {

    const {password, confirmPassword} = req.body
    const {email} = req.session.user

    settingsFacade.changePassword({
        email,
        password,
        confirmPassword
    })
    .then(() => getAllSettings(req, res))
    .catch((error) => getAllSettings(req, res, error))
}
