const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/mongoose'

// 建立数据库连接
let conn = mongoose.createConnection(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = conn