const Koa = require('koa')
const staticServer = require('koa-static')
const views = require('koa-views')
const app = new Koa()
const path = require('path')
const routes = require('./routes')

app.use(staticServer(path.join(__dirname, 'views')))
// 在ctx上扩展了ctx.render()
app.use(views(path.join(__dirname, 'views'), {
  map: {
    ejs: 'ejs'
  }
}))
app.use(routes())

app.listen(3000, () => {
  console.log('Server is running at 3000 port')
})