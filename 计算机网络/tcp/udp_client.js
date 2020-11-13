let dgram = require('dgram');
let socket = dgram.createSocket('udp4');
socket.on('message', (msg, remoteInfo) => {
  console.log(msg.toString());
  console.log(remoteInfo);
});
socket.send(new Buffer('helloworld'), 0, 5, 41234, 'localhost', (err, bytes) => {
  console.log('发送了%d个字节', bytes);
});

socket.on('error', (err) => {
  console.log(err);
});