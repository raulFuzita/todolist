const settingsFacade = require('../../models/facades/settings_facade')
const { validationResult } = require('express-validator')

const getAllSettings = async (req, res, error=null) => {
    const {id} = req.session.user
    const {auth, image} = await settingsFacade.loadSettings(id)
    res.render('settings', {session: req.session, auth, image, error})
}

exports.setting_index_get = async (req, res) => {
    getAllSettings(req, res)
}

exports.setting_auth_update = async (req, res) => {
    const {id, email} = req.session.user
    const {auth} = req.body
    const token = await settingsFacade.changeAuthorization({id, email, auth})
    res.json({token})
}

exports.setting_auth_post = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        getAllSettings(req, res, error = 'Password doesn\'t meet the requirements')
        return
    }

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

exports.setting_profile_post = async (req, res) => {

    let imageObject = {
        id: req.session.user.id
    }
    if (`file` in req)
        imageObject = {...{filename, originalname} = req.file}
    settingsFacade.uploadImage(imageObject)
    .then(() => {res.redirect('/profile')})
    .catch((err) => {
        console.log(err)
        res.redirect('/profile')
    })
}

exports.setting_profile_delete = async (req, res) => {
    const {id} = req.session.user
    settingsFacade.removeImage(id)
    .then(() => {res.redirect('/profile')})
    .catch((err) => {
        console.log(err)
        res.redirect('/profile')
    })
}
