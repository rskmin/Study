const net = require('net');
const crypto = require('crypto');

let server = net.createServer((socket) => {
  socket.once('data', (data) => {
    let data_s = data.toString();
    if (data_s.match(/Connection: Upgrade/)) { // 升级协议
      // 解析请求头
      let rows = data_s.split('\r\n');
      rows = rows.slice(1, -2);
      let headers = {};
      rows.reduce((memo, item) => {
        let [key, val] = item.split(':');
        memo[key.trim()] = val.trim();
        return memo;
      }, headers);

      if (headers['Sec-WebSocket-Version'] == 13) { // 升级成 13 版本
        // 计算key: Sec-WebSocket-Key -> Sec-WebSocket-Accept
        let secWebSocketKey = headers['Sec-WebSocket-Key'];
        const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'; // 协议规定密钥
        let secWebSocketAccept = crypto.createHash('sha1').update(secWebSocketKey+CODE).digest('base64');
        // 拼接响应报文
        let response = [
          'HTTP/1.1 101 Switching Protocols',
          'Upgrade: websocket',
          'Connection: Upgrade',
          `Sec-WebSocket-Accept: ${secWebSocketAccept}`,
          '\r\n'
        ].join('\r\n');
        socket.write(response);
        // 连接成功后所有的传输格式都基于 websocket 协议
        socket.on('data', (data) => {
          console.log(data.toString());
        })
      }
    }
  });
});

server.listen(8889);