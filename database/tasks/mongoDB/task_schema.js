const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  "user": {
    "id": {
      "type": "ObjectId"
    },
    "tasks": {
      "type": [
        "Mixed"
      ]
    }
  }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema)
module.exports = Task