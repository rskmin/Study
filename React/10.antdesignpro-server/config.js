const pwdJSON = require('/Users/rskmin/db.json');

module.exports = {
  dbUrl: `mongodb://www.rskmin.top:7002`,
  user: pwdJSON.mongo.username,
  password: pwdJSON.mongo.password,
  secret: 'antpro',
}