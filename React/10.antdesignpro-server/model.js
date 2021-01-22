const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dbUrl, password, user } = require('./config');
const connect = mongoose.createConnection(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user,
  pass: password,
  dbName: 'antpro'
});

const UserModel = connect.model('User', new Schema({
  name: String, // 姓名
  access: String, // 权限
  password: String, // 密码
  avatar: String, // 头像
  email: String, // 邮箱
  userId: String, // 用户ID
}));

exports.UserModel = UserModel;