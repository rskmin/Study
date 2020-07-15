# 浏览器跨域

## jsonp

- 利用script标签的跨域能力请求跨域资源

- 只支持get请求

- 安全性差(XSS攻击)

> 动态创建script脚本请求跨域资源

``````js
function jsonp({url, params, cb}) {
  return new Promise((resolve, reject) => {
    // 创建script标签
    let script = document.createElement('script')
    // 在全局上绑定回调方法，资源请求结束后会执行该回调并传入资源内容
    window[cb] = function (data) {
      resolve(data)
      // 移除脚本
      document.body.removeChild(script)
    }
    // 处理请求参数
    params = {...params, cb}
    let arr = []
    for (let key in params) {
      arr.push(`${key}=${params[key]}`)
    }
    // 拼接请求路径
    script.src = `${url}?${arr.join('&')}`
    // 添加脚本请求跨域资源
    document.body.appendChild(script)
  })
}
jsonp({
  url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
  params: {wd: 'b'},
  cb: 'show'
}).then(data => {
  console.log(data)
})
``````

## cors(跨域资源共享)

- 通过服务端设置额外的`HTTP`头告诉浏览器允许跨域访问(解除跨域拦截)

``````js
const express = require('express')
const app = express()
const port = 4000

// 允许访问的白名
let whitList = ['http://localhost:3000']
app.use(function (req, res, next) {
  // 获取浏览器url
  let origin = req.headers.origin
  if (whitList.includes(origin)) {// 请求路径在白名单中
    // 设置允许跨域访问的HTTP头
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  next()
})

app.get('/getData', function (req, res) {
  res.end('Rskmin')
})
app.use(express.static(__dirname))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))
``````

## postMessage

- 浏览器提供的跨域脚本通信方法

``````html
<!-- a.html localhost:3000 -->
<body>
  <h1>I'm A</h1>
  <div style="border: 2px solid red">
    <iframe src="http://localhost:4000/b.html" frameborder="0" id="frame" onload="load()"></iframe>
  </div>

  <script>
    function load() {
      // 获取B窗口的引用，调用postMessage方法进行通信
      frame.contentWindow.postMessage('Rskmin?', 'http://localhost:4000')
    }
  </script>
</body>
``````

``````html
<!-- b.html localhost:4000 -->
<body>
  <h1>I'm B</h1>

  <script>
    // 设置message事件回调
    window.onmessage = function (e) {
      console.log(e.data)
      // e.source.postMessage('Not Rskmin', e.origin)
    }
  </script>
</body>
``````

## document.domain

- 通过设置一级域名或二级域名来实现

例如两个二级域名不相同`www.baidu.com`和`ccc.baidu.com`,两个页面通过设置相同的`document.domain='baidu.com'`来允许这两个页面的跨域

## window.name

- 利用iframe的contentWindow会保留的特性

  1. 页面`C`将跨域资源绑定到`window.name`属性上

  2. 页面`A`通过`iframe`引用页面`C`, 此时跨域资源绑定在了`iframe.contentWindow.name`上

  3. 将`iframe`的地址改成与`A`页面同源的`B`页面,此时`iframe.contentWindow`已和`A`同源，但`name`属性并未刷新因此可获取`name`上的资源

````html
<!-- a.html  localhost:3000 -->
<body>
  <h1>I'm A</h1>
  <iframe src="http://localhost:4000/c.html" frameborder="0" onload="load()" id="iframe"></iframe>

  <script>
    let first = true
    function load() {
      if (first) {
        iframe.src = 'http://localhost:3000/b.html'
        first = false
      } else {
        console.log(iframe.contentWindow.name)
      }
    }
  </script>
</body>
````

````html
<!-- c localhost:4000 -->
<body>
  <h1>I'm C</h1>

  <script>
    window.name = 'Hello'
  </script>
</body>
````

## location.hash

- 利用哈希值传递消息

  1. `A`通过iframe引用`C`并传入`hash`值

  2. `C`通过iframe引用`B`并传入`hash`

  3. `B`改变`A`的`hash`值

  4. `A`监听`hash`值的改变获取`hash`值

````html
<!-- a.html localhost:3000 -->
<body>
  <h1>I'm A</h1>
  <iframe src="http://localhost:4000/c.html#Rskmin" frameborder="0" id="iframe"></iframe>

  <script>
    window.onhashchange = function () {
      console.log(location.hash)
    }
  </script>
</body>
````

````html
<!-- c.html localhost:4000 -->
<body>
  <h1>I'm C</h1>

  <script>
    console.log(location.hash)
    let iframe = document.createElement('iframe')
    iframe.src = 'http://localhost:3000/b.html#Hello'
    document.body.appendChild(iframe)
  </script>
</body>
````

````html
<!-- b.html localhost:3000 -->
<body>
  <h1>I'm B</h1>

  <script>
    window.parent.parent.location.hash = location.hash
  </script>
</body>
````

## Nginx(http-proxy)

- HTTP代理

- 跨域存在于浏览器与服务器之间，在中间加一层代理服务，将浏览器跨域请求转发到目标服务器获取资源后由代理服务返回

## WebSocket

- WebSocket无跨域限制

``````html
<!-- index.html -->
<body>
  <script type="text/javascript" >
    // 与localhost:3000端口建立连接并发送数据
    let ws = new WebSocket('ws://localhost:3000')
    ws.onopen = function () {
      ws.send('Rskmin')
    }
  </script>
</body>
``````

``````js
// server.js
const express = require('express')
const app = express()
const port = 4000

// WebSocket监听3000端口的访问
let WebSocket = require('ws')
let wss = new WebSocket.Server({port: 3000})
wss.on('connection', function (ws) {
  ws.on('message', function (data) {
    console.log(data)
  })
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log('Example app listening on port port!'))
``````