const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const crypto = require('crypto')

const hash = value => {
  return crypto.createHash('md5').update(value).digest('base64')
}

http.createServer((req, res) => {
  let { pathname } = url.parse(req.url)
  let filePath = path.join(__dirname, 'public', pathname)

  res.setHeader('cache-control', 'max-age=10')


  // 判断访问的路径是否存在
  fs.stat(filePath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      return res.end('Not Found')
    }
    let md5 = hash(fs.readFileSync(filePath))
    const ifNoneMatch = req.headers['if-none-match']
    res.setHeader('Etag', md5)
    if (ifNoneMatch === md5) { // 文件没有变化
      res.statusCode = 304
      return res.end()
    }
    if (statObj.isFile()) {
      fs.createReadStream(filePath).pipe(res)
    }
  })
}).listen(8081)

console.log('Server running at http://127.0.0.1:8081/')