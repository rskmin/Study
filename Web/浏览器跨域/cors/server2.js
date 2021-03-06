const express = require('express')
const app = express()
const port = 4000

let whitList = ['http://localhost:3000']
app.use(function (req, res, next) {
  let origin = req.headers.origin
  if (whitList.includes(origin)) {
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