let net = require('net');
let server = net.createServer(function (socket) {
  socket.on('data', (data) => {
    console.log(data.toString());
    socket.write(data);
  });
  socket.on('end', (data) => {
    console.log('end');
  });
  socket.on('error', (e) => {
    console.log(e);
  });
});

server.on('error', (e) => {
  console.log(e);
});
server.listen(8088, () => {
  console.log('server started at 8088 port');
});