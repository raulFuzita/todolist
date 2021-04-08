// Required Modules
const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const dotenv = require('dotenv')

// Imports Routers

dotenv.config()
const app = express()

// Sets a template engine
app.set('view engine', 'ejs')

// Makes public directory accessable.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// sets morgan middçeware
app.use(morgan('dev'))

// This will tell express how to move on to next expression
app.use((req, res, next) => {
  res.locals.path = req.path
  next()
})

// Sets a session and an ID cookie which is the secret parameter
app.use(session({
    secret: 'todolist',
    resave: false,
    saveUninitialized: true
}))

app.use('/index', require('./routes/indexRoute'))
app.use('/login', require('./routes/user/loginRoute'))
app.use('/signup', require('./routes/user/signupRoute'))
app.use('/task', require('./routes/task/taskRoute'))
app.use('/settings', require('./routes/settings/settingsRoute'))
app.use('/logout', require('./routes/logoutRoute')) // logout will clean session information
app.use('/api', require('./routes/api/apiRoutes'))

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