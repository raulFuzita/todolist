const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const userController = require('./controllers/user/userController');
const logoutController = require('./controllers/logout/logoutController');
const todolistController = require('./controllers/task/taskController');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();              
});

app.use(session({
    secret: 'todolist',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get('/index', (req, res) => {
    res.render('index', {session: req.session});
});

app.get('/login', userController.user_login_get);
app.post('/login', userController.user_login_post);
app.get('/logout', logoutController.logout);
app.get('/signup', userController.user_signup_get);
app.post('/signup', userController.user_signup_post);
app.get('/todolist', todolistController.task_index_get);
app.post('/create', todolistController.task_create_post);
app.post('/update', todolistController.task_update_post);
app.post('/delete', todolistController.task_delete_post);

app.use((req, res) => {
    res.status(404).render('404', {session: req.session});
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});