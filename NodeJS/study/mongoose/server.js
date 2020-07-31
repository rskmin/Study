const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/mongoose'

const db_koa = mongoose.createConnection(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 创建一个学生集合 学生名 入学时间 姓名 年龄
// 存储的骨架结构
const StudentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
}, {collection: 'Student'})

let Student = db_koa.model('Students', StudentSchema)

;(async function () {
  // let student = await Student.create({studentName: 'rskmin', gender: 1, age: 20, a: 1})

  // let student = await Student.find({}, {age: false})

  // let student = await Student.updateMany({
  //   studentName: /rskmin/
  // },
  // {
  //   age: 200
  // }
  // )

  await Student.deleteMany({})
  db_koa.close()
})()

db_koa.on('connected', function() {
  console.log('连接成功')
})
