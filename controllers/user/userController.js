const userFacade = require('../../models/facades/user_facade')
const { validationResult } = require('express-validator');
const {createError} = require('../../models/util/errors_util')
/**
 * This function will render the index page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
exports.user_index = (req, res) => {
    res.redirect('/index')
}

const render = (req, res, path) => {
    const error = req.session.error
    const cache = req.session.cache
    req.session.error = null
    req.session.cache = null
    let errors = JSON.stringify(error)
    res.render(path, {session: req.session, cache, errors})
}

const loadLogin = (req, res) => {
    render(req, res, 'login')
}

const loadSignup = (req, res) => {
    render(req, res, 'signup')
}

/**
 * This function will render the login page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
exports.user_login_get = (req, res) => {
    loadLogin(req, res)
}

/**
 * This function will check all passed credentials and compare to
 * a data in the percistance system.
 * If all credentials are correct it'll redirect to todolist. Othrwise to login.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.user_login_post = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.error = {form: 
            createError('alert-danger', 'The credentials do not meet the requirements')
        }
        loadLogin(req, res)
        return
    }

    userFacade.login(req.body)
    .then((user) => {
        req.session.user = user
        res.redirect('/task')
    })
    .catch((error) => {
        req.session.error = error
        req.session.cache = {email: req.body.email}
        loadLogin(req, res)
    })
}

/**
 * This function will render the signup page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
exports.user_signup_get = (req, res) => {
    loadSignup(req, res)
}

/**
 * This function will create a new user. Minimum requirements for 
 * creating a user will be required. If a requirement doesn't match
 * it'll redirect to signup page.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.user_signup_post = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.error = {credential: 
            createError('alert-danger', 'The credentials do not meet the requirements')
        }
        loadSignup(req, res)
        return
    }

    userFacade.signup(req.body)
    .then((email) => {
        req.session.cache = {email}
        res.redirect('/login')
    })
    .catch(({formCache, error}) => {
        req.session.error = error
        req.session.cache = formCache
        loadSignup(req, res)
    })   
}