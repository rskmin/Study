const express = require('express');
const app = express();
const port = 8888;

app.use(express.static(__dirname));
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// let WebSocketServer = require('ws').Server;
// let server = new WebSocketServer({
//   port: '8889',
// });

// //socket 套接字
// server.on('connection', (socket) => {
//   console.log('连接成功');
//   socket.on('message', (message) => {
//     console.log(message);
//     socket.send('Server: ' + message);
//   });
// });
require('./app2');