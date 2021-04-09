const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.DB_PORT
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const cluster = process.env.DB_CLUSTER
const database = process.env.DB_NAME

const localDB = `mongodb://localhost:${port}/${database}`
const cloudDB = `mongodb+srv://${user}:atlas.${password}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority`

let dbURI = process.env.DB_HOST === 'server' ? cloudDB : localDB

module.exports.conn = conn = () => {
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log('connected to mongoDB'))
        .catch((err) => console.log(err))
}