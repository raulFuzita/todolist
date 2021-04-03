const crypto = require('crypto');
const UserDAO = require('../../models/dao/mongoDB/user_dao');
const User = require('../../models/user/user');
const secret = 'todo_user'; // Secret for the incriptation

/**
 * This function will render the index page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const user_index = (req, res) => {
    res.redirect('/index');
}

/**
 * This function will render the login page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const user_login_get = (req, res) => {
    res.render('login', {session: req.session});
}

/**
 * This function will check all passed credentials and compare to
 * a data in the percistance system.
 * If all credentials are correct it'll redirect to todolist. Othrwise to login.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const user_login_post = async (req, res) => {
    const userDAO = new UserDAO();
    const userForm = req.body; // gets an object from a form
    
    let user = await userDAO.getByEmail(userForm.email.trim()); // retrives a user with such email.

    console.log('==============================================');
    console.log(user);
    console.log('==============================================');
    // If a user doesn't exist with such credentials variable user is set to null.
    if(user){
        // Validate user's credentials
        if (validateUser(user, userForm)){
            // Sets an object to hold wanted information
            const userSession = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            // Sets session
            req.session.user = userSession;
            req.session.error = 'success';
            console.log(req.session.error);
            res.redirect('/todolist');
        }else{
            req.session.error = 'user doesn\'t exist';
            console.log(req.session.error);
            res.render('login', {session: req.session});
        }
            
    } else {
        req.session.error = 'user doesn\'t exist';
        console.log(req.session.error);
        res.render('login', {session: req.session});
    }
}

/**
 * This function will render the signup page
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const user_signup_get = (req, res) => {
    res.render('signup', {session: req.session});
}

/**
 * This function will create a new user. Minimum requirements for 
 * creating a user will be required. If a requirement doesn't match
 * it'll redirect to signup page.
 * @param {HTTP} req - Request
 * @param {HTTP} res - Response
 */
const user_signup_post = async (req, res) => {
    const userForm = req.body;
    const userDAO = new UserDAO();

    if(checkPassword(userForm)){
        let user = new User(); // Creates a user object
        // encrypts the password according to sha256 and the secret word.
        let passwordHash = crypto.createHmac('sha256', secret)
                    .update(userForm.password.trim())
                    .digest('hex');

        // Sets user object properties
        user.setName(userForm.name.trim())
            .setEmail(userForm.email.trim())
            .setPassword(passwordHash);
        // Checks if a user already exists. Otherwise a user is created.

        const tempUser = await userDAO.getByEmail(user.email);
        let email = tempUser ? tempUser.email : null;

        if (user.email != email){
            userDAO.set(user);
            req.session.error = 'success';
            console.log(req.session.error);
            req.session.email = user.email;
            res.redirect('/login');
        } else {
            req.session.error = 'user already exist';
            console.log(req.session.error);
            res.render('signup', {session: req.session});
        }
            
    } else {
        req.session.error = 'password is not equal';
        console.log(req.session.error);
        res.render('signup', {session: req.session});
    }       
}

/**
 * This function will encrypt the second parameter password and be put against the first one.
 * If they are equal it returns true. Otherwise false.
 * @param {Object} user1 - It's expected object has password property.
 * @param {Object} user2 - It's expected object has password property.
 */
const validateUser = (user1, user2) => {
    let passwordHash = crypto.createHmac('sha256', secret)
                    .update(user2.password.trim())
                    .digest('hex');
    return user1.password === passwordHash;
}

/**
 * This function takes an object that has password and confirmPassword property.
 * Both password will be validated by size and checked if they are euqual.
 * Returns true if all requirement are true. Otherwise false.
 * @param {Object} userForm - It's expected the object has password and confirmPassword property.
 * @returns boolean
 */
const checkPassword = (userForm) => {
    let password = userForm.password;
    let confirmPassword = userForm.confirmPassword;
    return validateSize(password) && validateSize(confirmPassword) && password === confirmPassword;
}

/**
 * This function will check if a password is bigger or equal to 8 characters 
 * and smaller or equal to 160 characters.
 * Returns true if password is according to the range. Otherwise false.
 * @param {string} password - User's password
 * @returns boolean
 */
const validateSize = (password) => {
    return password.length >= 8 && password.length <= 160;
}

module.exports = {
    user_index,
    user_login_get,
    user_login_post,
    user_signup_get,
    user_signup_post
}