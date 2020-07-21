const fs = require('fs')
const path = require('path')
const url = require('url')

const http = require('http');
http.createServer(function (req, res) {
  // let { pathname } = url.parse(req.url)
  // let filePath = path.join(__dirname, 'public', pathname)

  let userAgent = req.headers['user-agent']

  if (userAgent.match(/iPhone/)) {
    res.statusCode = 302
    res.setHeader('Location', 'http://www.baidu.com')
    res.end()
  } else {
    res.statusCode = 302
    res.setHeader('Location', 'http://www.qq.com')
    res.end()
  }
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');