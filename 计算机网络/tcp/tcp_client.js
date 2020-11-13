let net = require('net');
let socket = new net.Socket();
socket.connect(8088, 'localhost');
socket.on('connect', () => {
  socket.write('hello');
});

socket.on('data', (data) => {
  console.log(data.toString());
  socket.destroy();
});
socket.on('error', (e) => {
  console.log(e);
});
