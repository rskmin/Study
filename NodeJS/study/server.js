/* eslint-disable callback-return */
const Koa = require('koa')
const static = require('./middlewares/koa-static')
const Router = require('@koa/router')

const app = new Koa()
app.use(static(__dirname))

const router = new Router()
router.get('/add', async ctx=> {
  ctx.body = 'add'
})
router.get('/remove', async ctx => {
  ctx.body = 'remove1'
})
router.get('/remove', async ctx => {
  ctx.body = 'remove2'
})

app.use(router.routes())

app.use(async (ctx, next) => {
  ctx.body = 'hello'
})



app.listen(3000, () => {
  console.log('Server is running at 3000 port')
})