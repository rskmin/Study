const mongoose = require('mongoose')

const conn = require('../db')

// 作业骨架
let HomeWorkSchema = mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  studentId: {
    type: mongoose.SchemaTypes.ObjectId
  }
})

// 导出作业集合
module.exports = conn.model('HomeWork', HomeWorkSchema, 'homework')