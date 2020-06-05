const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const fse = require('fs-extra')
const source = require('koa-static')

const app = new Koa()
const router = new Router()

// 处理静态资源
app.use(source(path.resolve(__dirname, 'public')))

const UPLOAD_DIR = path.resolve(__dirname, 'public/upload')

// 处理页面请求
app.use(koaBody({
  multipart: true,
  // encoding: 'gzip', // 启用压缩在 /merge 会报错
  formidable: {
    uploadDir: path.resolve(__dirname, 'temp'),// 文件存放地址
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024
  }
}))


// 文件上传
router.post('/upload', async ctx => {// 文件转移
  const file = ctx.request.files.file
  // [ name, index, ext ]
  const fileNameArr = file.name.split('.')
  // 存放切片的目录
  const chunkDir = `${UPLOAD_DIR}/${fileNameArr[0]}`
  if (!fse.existsSync(chunkDir)) {// 没有目录就创建目录
    await fse.mkdirs(chunkDir)
  }
  // 原文件名.index.ext
  const dPath = path.join(chunkDir, fileNameArr[1])
  await fse.move(file.path, dPath, { overwrite: true })
  ctx.body = '文件上传成功'
})

// 合并文件
router.post('/merge', async ctx => {
  const { name }= ctx.request.body
  const fname = name.split('.')[0]

  const chunkDir = path.join(UPLOAD_DIR, fname)
  const chunks = await fse.readdir(chunkDir)

  chunks.sort((a, b) => a - b).map(chunkPath => {
    // 合并文件
    fse.appendFileSync(
      path.join(UPLOAD_DIR, name),
      fse.readFileSync(`${chunkDir}/${chunkPath}`)
    )
  })
  // 删除临时文件夹
  fse.removeSync(chunkDir)
  // 返回文件地址
  ctx.body = { msg: '合并成功', url: `http://localhost:3000/upload/${name}` }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => console.log('Server runnint on port 3000'))
