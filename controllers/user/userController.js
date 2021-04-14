const userFacade = require('../../models/facades/user_facade')
const { validationResult } = require('express-validator');
/**
 * This function will render the index page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.user_index = (req, res) => {
    res.redirect('/index')
}

/**
 * This function will render the login page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
 exports.user_login_get = (req, res) => {
    res.render('login', {session: req.session})
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
        res.render('login', {
            session: {...req.session, error: 'The credentials don\'t meet the requirements' }
        })
        return
    }

    userFacade.login(req.body)
    .then((user) => {
        req.session.user = user
        res.redirect('/task')
    })
    .catch((error) => {
        res.render('login', {
            session: {...req.session, error}
        })
    })
}

/**
 * This function will render the signup page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
exports.user_signup_get = (req, res) => {
    res.render('signup', {session: req.session})
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
        res.render('login', {
            session: {
                ...req.session, 
                formCache, 
                error: 'The credentials don\'t meet the requirements' 
            }
        })
        return
    }

    userFacade.signup(req.body)
    .then((email) => {
        req.session.email = email
        res.redirect('/login')
    })
    .catch(({formCache, error}) => {
        res.render('signup', {
            session: {...req.session, formCache, error}
        })
    })   
}