const settingsFacade = require('../../models/facades/settings_facade')
const { validationResult } = require('express-validator')

const getAllSettings = async (req, res) => {
    const {id} = req.session.user
    const {auth, image} = await settingsFacade.loadSettings(id)
    error = req.session.error
    req.session.error = null
    res.render('settings', {session: req.session, auth, image, errors: JSON.stringify(error)})
}

exports.setting_index_get = async (req, res) => {
    getAllSettings(req, res)
}

exports.setting_auth_update = async (req, res) => {
    const {id, email} = req.session.user
    const {auth} = req.body
    settingsFacade.changeAuthorization({id, email, auth})
    .then((token) => res.json({token}))
    .catch(() => res.json({}))    
}

exports.setting_password_post = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.error = {pwd: {
            status: 'alert-danger',
            message: 'Password does not meet the requirements'
        }}
        getAllSettings(req, res)
        return
    }

    const {password, confirmPassword} = req.body
    const {email} = req.session.user

    settingsFacade.changePassword({
        email,
        password,
        confirmPassword
    })
    .then(() => {
        req.session.error = error
        getAllSettings(req, res)
    })
    .catch((error) => {
        req.session.error = error
        getAllSettings(req, res)
    })
}

exports.setting_profile_post = async (req, res) => {
    let imageObject = {
        id: req.session.user.id
    }
    if (`file` in req){
        const {filename, originalname} = req.file
        imageObject = {...imageObject, ...{filename, originalname}}
    }
        
    settingsFacade.uploadImage(imageObject)
    .then((error) => {
        req.session.error = error
        res.redirect('/settings')
    })
    .catch((error) => {
        req.session.error = error
        res.redirect('/settings')
    })
}

exports.setting_profile_delete = async (req, res) => {
    const {id} = req.session.user
    settingsFacade.removeImage(id)
    .then((error) => {
        req.session.error = error
        res.redirect('/settings')
    })
    .catch((error) => {
        req.session.error = error
        res.redirect('/settings')
    })
}
