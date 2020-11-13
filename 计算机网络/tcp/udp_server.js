let dgram = require('dgram');
let socket = dgram.createSocket('udp4');
socket.on('message', (msg, remoteInfo) => {
  console.log(msg.toString());
  console.log(remoteInfo);
  socket.send(msg, 0, msg.length, remoteInfo.port, remoteInfo.address);
});
socket.bind(41234, 'localhost');