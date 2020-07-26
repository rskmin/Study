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