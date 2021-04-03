const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.DB_PORT;
const database = process.env.DB_NAME;
const dbURI = 'mongodb://localhost:27017/todolist';

module.exports.conn = conn = () => {
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log('connected to mongoDB'))
        .catch((err) => console.log(err));
};