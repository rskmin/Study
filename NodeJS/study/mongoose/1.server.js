const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/mongoose'

const conn = mongoose.createConnection(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 骨架: 属性校验， 模式修饰符
let StudentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 8,
    minLength: 6,
    trim: true
  },
  age: {
    type: Number,
    min: 5,
    max: 150
  },
  birthday: {
    type: Date,
    default: Date.now
  },
  hobby: {
    type: String,
    /**
     * 校验
     * @param {string} params
     */
    validate(params) {
      return params.startsWith('爱好-')
    }
  }
})

// 通过model建立一个集合，集合需要一个骨架
let Student = conn.model('Student', StudentSchema, 'student')

;(async () => {
  // 新增 - 1
  // let r = await Student.create({
  //   username: 'Rskmin',
  //   age: 6,
  //   hobby: '爱好-编程'
  // })

  // 新增 - 2
  // let student = new Student({
  //   username: 'Rskmin',
  //   age: 6,
  //   hobby: '爱好-编程'
  // })
  // let r = await student.save()

  // 修改 - 1
  // let student = await Student.findOne({ username: 'rskmin' })
  // student.username = 'coco'
  // await student.save()

  // 修改 - 2
  // await Student.updateOne({username: /coco/}, {age: 50})

  // 放到数组中一次性添加只执行一次数据库操作
  // let arr = []
  // for (let i = 0; i < 30; i++) {
  //   arr.push({username: 'rskmin' + i})
  // }
  // await Student.create(arr)

  // 列表查询
  let currentSize = 3
  let limit = 3
  let arr = await Student.find({}).skip((currentSize - 1) * limit).limit(limit).sort()
  console.log(arr)

  conn.close()
})()