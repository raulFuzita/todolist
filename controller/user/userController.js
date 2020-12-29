const crypto = require('crypto');
const userDAO = require('../../models/dao/user_dao');
const User = require('../../models/user/user');
const secret = 'todo_user';

const user_index = (req, res) => {
    res.redirect('/index');
}

const user_login_get = (req, res) => {
    res.render('login', {session: req.session});
}

const user_login_post = (req, res) => {
    const userForm = req.body;
    let user = userDAO.getByEmail(userForm.email);

    if(user){
        if (validateUser(user, userForm)){

            const userSession = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            
            req.session.user = userSession;
            req.session.error = 'success';
            res.redirect('/todolist');
        }else{
            req.session.error = 'user doesn\'t exist';
            res.render('login', {session: req.session});
        }
            
    } else {
        req.session.error = 'user doesn\'t exist';
        res.render('login', {session: req.session});
    }
}

const user_signup_get = (req, res) => {
    res.render('signup', {session: req.session});
}

const user_signup_post = (req, res) => {
    const userForm = req.body;

    if(checkPassword(userForm)){
        let user = new User();
        let passwordHash = crypto.createHmac('sha256', secret)
                    .update(userForm.password)
                    .digest('hex');

        user.setName(userForm.name)
            .setEmail(userForm.email)
            .setPassword(passwordHash);

        if (userDAO.set(user)){
            req.session.error = 'success';
            req.session.email = user.email;
            res.redirect('/login');
        } else {
            req.session.error = 'user already exist';
            res.render('signup', {session: req.session});
        }
            
    } else {
        req.session.error = 'password is not equal';
        res.render('signup', {session: req.session});
    }
        
}

const validateUser = (user1, user2) => {
    let passwordHash = crypto.createHmac('sha256', secret)
                    .update(user2.password)
                    .digest('hex');
    return user1.password === passwordHash;
}

const checkPassword = (userForm) => {
    let password = userForm.password;
    let confirmPassword = userForm.confirmPassword;
    return password !== "" && password === confirmPassword;
}

module.exports = {
    user_index,
    user_login_get,
    user_login_post,
    user_signup_get,
    user_signup_post
}