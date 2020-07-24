let articleServices = require('../service/article')
const { resolve } = require('path')
let fs = require('fs')

Buffer.prototype.split = function (sep) {
  let sepLength = sep.length
  let arr = []
  let offset = 0
  let currentIndex = 0
  while ((currentIndex = this.indexOf(sep, offset)) !== -1) {
    arr.push(this.slice(offset, currentIndex))
    offset = currentIndex + sepLength
  }
  arr.push(this.slice(offset))
  return arr
}

class Article {
  async add(ctx, next) {
    let list = await articleServices.getList()
    await ctx.render('index.ejs', {list}) // 自动调用ctx.body
  }
  async remove(ctx, next) {
    ctx.body = 'article remove'
  }
  async upload(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      let arr = []
      ctx.req.on('data', function (chunk) {
        arr.push(chunk)
      })
      ctx.req.on('end', function () {
        let result = Buffer.concat(arr).toString()
        if (ctx.get('content-type').includes('multipart/form-data')) { // 二进制格式表单
          let boundary = `--${ctx.get('content-type').split('=')[1]}`
          let lines = result.split(boundary).slice(1, -1)
          let obj = {}
          lines.forEach(line => {
            let [head, body] = line.split('\r\n\r\n')
            head = head.toString()
            let key = head.match(/name="(.+?)"/)[1]

            if (head.includes('filename')) { // 文件
              let content = line.slice(Buffer.from(head).length + 4, -2)
              let fileName = Math.random() + '-' + new Date().getTime()
              obj[key] = fileName
              fs.writeFileSync(fileName, content)

            } else {
              obj[key] = body.toString().slice(0, -2)
            }
          })
          resolve(obj)
        }
      })
    })
  }
}

module.exports = new Article()