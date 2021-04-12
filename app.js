// Required Modules
const express = require('express'),
session = require('express-session'),
morgan = require('morgan'),
dotenv = require('dotenv'),
cookieParser = require('cookie-parser')
csrf = require('csurf'),
db = require('./database/mongoDB/connector')
// Imports Routers

dotenv.config()
const app = express()
db.conn()
// Sets a template engine
app.set('view engine', 'ejs')

// Makes public directory accessable.
app.use(express.static('public'));
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
    secret: process.env.SESSION_SECRET || 'todolist',
    resave: false,
    saveUninitialized: true
}))

app.use('/index', require('./routes/indexRoute'))
app.use('/login', require('./routes/user/loginRoute'))
app.use('/signup', require('./routes/user/signupRoute'))
app.use('/task', require('./routes/task/taskRoute'))
app.use('/settings', require('./routes/settings/settingsRoute'))
app.use('/logout', require('./routes/logoutRoute')) // logout will clean session information

// When access the url domain it's redirect to /index
app.get('/', (req, res) => {res.redirect('/index')})
// If a page is not found it's redirected to page 404
app.use((req, res) => {
    res.status(404).render('404', {session: req.session})
})

// Server listener
let server = app.listen(process.env.SERVER_PORT || 3000, process.env.HOST_NAME || '0.0.0.0', () => {
    console.log("Server is running on port " + server.address().port 
                        + " and address at " + server.address().address)
})