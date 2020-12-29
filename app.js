const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});