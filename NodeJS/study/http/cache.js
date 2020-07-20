const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

http.createServer((req, res) => {
  let { pathname } = url.parse(req.url)
  let filePath = path.join(__dirname, 'public', pathname)
  console.log(filePath)
  res.setHeader('cache-control', 'max-age=10')

  // 判断访问的路径是否存在
  fs.stat(filePath, (err, statObj) => {
    let ctime = statObj.ctime.toString()
    res.setHeader('Last-Modified', ctime)

    let since = req.headers['if-modified-since']
    if (since === ctime) { // 文件没有变化
      res.statusCode = 304
      return res.end()
    }

    if (err) {
      res.statusCode = 404
      return res.end('Not Found')
    }
    if (statObj.isFile()) {
      fs.createReadStream(filePath).pipe(res)
    }
  })
}).listen(8081)

console.log('Server running at http://127.0.0.1:8081/')