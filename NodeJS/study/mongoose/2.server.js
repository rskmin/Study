let mongoose = require('mongoose')
let conn = require('./db')
let HomeWork = require('./model/homework')
let Student = require('./model/student')
let ObjectId = mongoose.Types.ObjectId

;(async ()=> {
  // let student = await Student.create({
  //   username: 'rskmin'
  // })
  // let homework = await HomeWork.create({
  //   title: 'rskmin',
  //   content: 'coco...',
  //   studentId: student._id
  // })
  // console.log(homework)

  // 聚合查询, 自由关联表结构
  let homework = await HomeWork.aggregate([
    {
      $lookup: { // 查询
        from: 'student',
        localField: 'studentId',
        foreignField: '_id',
        as: 'student'
      }
    },
    {
      $match: {
        _id: ObjectId('5f276e5ad118d034144e5550')
      }
    }
  ])
  console.log(JSON.stringify(homework, null, 2))


  conn.close()
})()