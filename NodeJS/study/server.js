/* eslint-disable callback-return */
const express = require('./express')
const app = express()
const port = 3000

const userRouter = express.Router()
const articleRouter = express.Router()

userRouter.get('/add', function (req, res, next) {
  res.end('user add')
  next()
})

userRouter.get('/remove', function (req, res, next) {
  res.end('user remove')
  next()
})

articleRouter.get('/add', function (req, res, next) {
  res.end('article add')
  next()
})

articleRouter.get('/remove', function (req, res, next) {
  res.end('article remove')
  next()
})

app.use('/user', userRouter)
app.use('/article', articleRouter)

app.listen(port, () => console.log('Example app listening on port port!'))