const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const cors = require('cors');
const { UserModel } = require('./model');
const config = require('./config');

app.use(bodyParser.json());
app.post('/api/register', async (req, res) => {
  const newUser = req.body;
  newUser.avatar = "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
  let user = await UserModel.create(newUser);
  res.send({ status: 'ok', data: user });
});
app.post('/api/login/account', async (req, res) => {
  const query = { name: req.body.username, password: req.body.password };
  const { _doc:dbUser } = await UserModel.findOne(query);
  if (dbUser) {
    delete dbUser.password;
    dbUser.userId = dbUser._id;
    const token = jwt.encode(dbUser, config.secret);
    return res.send({
      status: 'ok',
      type: req.body.type,
      currentAuthority: 'admin',
      token,
    });
  } else {
    res.send({ status: 'error', type: req.body.type, currentAuthority: 'guest' });
  }
});

// 当客户端登陆的时候要返回给客户端token, 里面存放着对应的用户信息
app.get('/api/currentUser', async (req, res) => {
  const authorization = req.headers['authorization'];
  if (authorization) {
    try {
      let { userId } = jwt.decode(authorization.split(' ')[1], config.secret);
      const { _doc: userInfo } = await UserModel.findOne({
        _id: userId
      });
      delete userInfo.password;
      res.json(userInfo);
    } catch (e) {
      res.status(401).send({ status: 'error' });
    }
  }
});

app.get('/api/login/outLogin', async (req, res) => {
  res.send({ status: 'ok' });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));