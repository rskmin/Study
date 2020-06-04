const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const source = require('koa-static')

const app = new Koa()
const router = new Router()

app.use(source(path.resolve(__dirname, 'public')))

app.use(koaBody({
  multipart: true,
  encoding: 'gzip',
  formidable: {
    uploadDir: path.resolve(__dirname, 'temp'),
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    onFileBegin: (name, file) => {
      // console.log(`name: ${name}`)
      // console.log(file)
    }
  }
}))

router.post('/upload', ctx => {
  console.log(ctx.request)
  ctx.body = '文件上传成功'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => console.log('Server runnint on port 3000'))

