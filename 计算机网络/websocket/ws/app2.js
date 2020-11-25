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
        let secWebSocketAccept = crypto.createHash('sha1').update(secWebSocketKey + CODE).digest('base64');
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
        socket.on('data', (buffers) => {
          let _fin = (buffers[0] & 0b10000000) === 0b10000000;
          let _opcode = buffers[0] & 0b00001111;
          let _masked = buffers[1] & 0b100000000 === 0b100000000;
          let _payloadLength = buffers[1] & 0b01111111;
          let _mask = buffers.slice(2, 6);
          let payload = buffers.slice(6);

          unmask(payload, _mask);

          // 向客户端发送数据
          let response = Buffer.alloc(2 + _payloadLength);
          response[0] = _opcode | 0b10000000;//1表示发送结束
          response[1] = payload.length;//负载的长度
          payload.copy(response, 2);
          socket.write(response);
        })
      }
    }
  });
});

function unmask(payload, mask) {
  for (let i = 0; i < payload.length; i++) {
    payload[i] ^= mask[i & 3];
  }
}

server.listen(8889);