const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const dbURI = process.env.DB_HOST || 'mongodb://localhost:27017/todolist'

module.exports.conn = conn = () => {
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then((result) => console.log('connected to mongoDB'))
        .catch((err) => console.log(err))
}