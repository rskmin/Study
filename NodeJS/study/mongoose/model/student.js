const mongoose = require('mongoose')
const conn = require('../db')
const crypto = require('crypto')

// 学生骨架
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
     * 校验数据
     * @param {string} params
     */
    validate(params) {
      return params.startsWith('爱好-')
    }
  },
  password: {
    type: String
  }
})

StudentSchema.statics.findByName = function (username) {
  return this.findOne({username})
}

StudentSchema.methods.savePassword = function (val) {
  this.password = crypto.createHash('md5', 'zf').update(val).digest('base64')
}

// 导出学生集合
module.exports = conn.model('Student', StudentSchema, 'student')