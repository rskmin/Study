/* eslint-disable callback-return */
const express = require('./express')
const app = express()
const port = 3000

app.get('/', function (req, res, next) {
  console.log(1)
  next()
}, function (req, res, next) {
  console.log(11)
  next()
})
app.get('/', function (req, res, next) {
  console.log(2)
  next()
})
app.get('/', function (req, res, next) {
  console.log(3)
  next()
})
app.post('/', function (req, res, next) {
  res.end('post')
})

app.listen(port, () => console.log('Example app listening on port port!'))