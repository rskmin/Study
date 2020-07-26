const http = require('http')
const querystring = require('querystring')

http.createServer((req, res) => {

  req.getCookie = function (key) {
    let cookieObj = querystring.parse(req.headers.cookie, ';')
    return cookieObj[key]
  }
  const cookieArr = []
  res.setCookie = function (key, value, opts = {}) {
    let optArgs = []
    if (opts.httpOnly) {
      optArgs.push(`httpOnly=${opts.httpOnly}`)
    }
    if (opts.domain) {
      optArgs.push(`domain=${opts.domain}`)
    }
    if (opts.maxAge) {
      optArgs.push(`max-age=${opts.maxAge}`)
    }
    if (opts.path) {
      optArgs.push(`path=${opts.path}`)
    }
    cookieArr.push(`${key}=${value}; ${optArgs.join('; ')}`)
    res.setHeader('Set-Cookie', cookieArr)
  }

  if (req.url === '/read') {
    // 读取cookie
    res.end(req.getCookie('name') || 'empty')
  } else if (req.url === '/write') {
    res.setCookie('name', 'rskmin', {
      httpOnly: true,
      maxAge: 10
    })
    res.setCookie('age', '21')
    res.end('write ok')
  } else {
    res.statusCode = 404
    res.end('Not found')
  }

}).listen(3000, () => {
  console.log('Server is running at 3000')
})