const express = require('express');

const app = express();
const port = 3000;
app.use(express.static(__dirname));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const SYSTEM = '系统';
let sockets = {};

io.on('connection', socket => {
  let username;
  socket.on('message', content => {
    if (username) {
      let result = content.match(/@([^ ]+) (.+)/);
      if (result) { // 私聊
        let toUser = result[1];
        let toContent = result[2];
        let toSocket = sockets[toUser];
        toSocket && toSocket.emit('message', getMsg(toContent, username));
      } else {
        io.emit('message', getMsg(content, username));
      }
    } else { // 把第一条消息的内容作为名字
      let oldSocket = sockets[content];
      if (oldSocket) {
        socket.emit('message', getMsg(`${content} 已经被占用，请换一个（在发言框中输入）`));
      } else {
        username = content;
        sockets[content] = socket;
        socket.broadcast.emit('message', getMsg(`${username}加入聊天室`));
      }
    }
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', getMsg(`${username}离开聊天室`));
    sockets[username] = null; 
  })
});

function getMsg(content, username = SYSTEM) {
  return { username, content, createAt: new Date() }
}

server.listen(port); 
