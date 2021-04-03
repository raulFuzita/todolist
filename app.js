// Required Modules
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Imports controllers
const userController = require('./controllers/user/userController');
const logoutController = require('./controllers/logout/logoutController');
const todolistController = require('./controllers/task/taskController');

dotenv.config();
const app = express();

// Sets a template engine
app.set('view engine', 'ejs');

// Makes public directory accessable.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// sets morgan middçeware
app.use(morgan('dev'));

// This will tell express how to move on to next expression
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();              
});

// Sets a session and an ID cookie which is the secret parameter
app.use(session({
    secret: 'todolist',
    resave: false,
    saveUninitialized: true
}));

// When access the url domain it's redirect to /index
app.get('/', (req, res) => {
    res.redirect('/index');
});

// Renders /index and passes session for some operations on the client side.
app.get('/index', (req, res) => {
    res.render('index', {session: req.session});
});

app.get('/login', userController.user_login_get); // When login page loads
app.post('/login', userController.user_login_post); // When a request is made from login page
app.get('/logout', logoutController.logout); // logout will clean session information
app.get('/signup', userController.user_signup_get); // When signup page loads
app.post('/signup', userController.user_signup_post); // When a request is made from signup page
app.get('/todolist', todolistController.task_index_get); // When todolist page loads
app.post('/create', todolistController.task_create_post); // Todolist request to create an item
app.post('/update', todolistController.task_update_post); // Todolist request to update item status
app.post('/delete', todolistController.task_delete_post); // Todolist request to delete an item

// If a page is not found it's redirected to page 404
app.use((req, res) => {
    res.status(404).render('404', {session: req.session});
});

// Server listener
let server = app.listen(process.env.SERVER_PORT || 3000, process.env.HOST_NAME || '0.0.0.0', () => {
    console.log("Server is running on port " + server.address().port 
                        + " and address at " + server.address().address);
});