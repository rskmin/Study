const Koa = require('koa')

const app = new Koa()

// 登录的功能
app.use((ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/login') {
    ctx.body = 
  }
})

app.listen(3000)