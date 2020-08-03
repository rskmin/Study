const Student = require('./model/student')
const crypto = require('crypto')
const conn = require('./db')

;(async () => {
  // let student = new Student()
  // student.username = 'lisi'
  // student.savePassword('1234')
  // await student.save()
  Student.findByName('rskmin').then(data => {
    console.log(data)
    conn.close()
  })

})()