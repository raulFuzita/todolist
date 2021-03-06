// Required Modules
const express = require('express'),
session = require('express-session'),
morgan = require('morgan'),
dotenv = require('dotenv'),
cookieParser = require('cookie-parser')
csrf = require('csurf'),
db = require('./database/mongoDB/connector')
const {policy} = require('./middleware/loggin_checker')

dotenv.config()
const app = express()
db.conn()
// Sets a template engine
app.set('view engine', 'ejs')

// Makes public and storage/images directory accessable.
app.use(express.static('public'));
app.use(express.static('storage/images'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', require('./routes/api/apiRoutes'))

app.use(cookieParser())
app.use(csrf({ cookie: true }))
// sets morgan middçeware
app.use(morgan('dev'))
// This will tell express how to move on to next expression
app.use((req, res, next) => {
  res.locals.path = req.path
  res.cookie('XSRF-TOKEN', req.csrfToken())
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
})

// Sets a session and an ID cookie which is the secret parameter
app.use(session({
    secret: process.env.SESSION_SECRET || 'encryption_secret',
    resave: false,
    saveUninitialized: true
}))

const visitor = {access: 'visitor'}
const auth = {access: 'auth'}

app.use('/index', require('./routes/indexRoute'))
app.use('/login', policy(visitor), require('./routes/user/loginRoute'))
app.use('/signup', policy(visitor), require('./routes/user/signupRoute'))
app.use('/task', policy(auth), require('./routes/task/taskRoute'))
app.use('/settings', policy(auth), require('./routes/settings/settingsRoute'))
app.use('/profile',  policy(auth), require('./routes/settings/profileRoute'))
app.use('/profile/delete', policy(auth), require('./routes/settings/deleteImageRoute'))
app.use('/documentation', require('./routes/documentation/docRoute'))
app.use('/logout', require('./routes/logoutRoute')) // logout will clean session information
app.use('/forgotpassword', require('./routes/user/forgotpwdRoute'))
app.use('/resetpassword', policy(visitor), require('./routes/user/resetpwdRoute'))
// When access the url domain it's redirect to /index
app.get('/', (req, res) => {res.redirect('/index')})
// If a page is not found it's redirected to page 404
app.use((req, res) => {
    res.status(404).render('404', {session: req.session})
})

// Server listener
let server = app.listen(process.env.PORT || 5000, process.env.HOST_NAME || '0.0.0.0', () => {
    console.log("Server is running on port " + server.address().port 
                        + " and address at " + server.address().address)
})