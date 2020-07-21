/* eslint-disable callback-return */
const Koa = require('koa')
const bodyparser = require('./bodyParser')

const app = new Koa()

// 登录的功能
app.use(bodyparser())
app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && ctx.path === '/login') {
    ctx.body = `
    <form action="/login" method="POST">
      <input type="text" name="username">
      <input type="text" name="password">
      <button>提交</button>
    </form>
    `
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/login') {
    ctx.body = ctx.request.body
  } else {
    next()
  }
})

app.listen(3000)