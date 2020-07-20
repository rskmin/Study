const Koa = require('koa')

const app = new Koa()

app.use(ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000, function () {
  console.log('Server start 3000')
})
