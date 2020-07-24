const path = require('path')
const { dir } = require('console')
const fs = require('fs').promises
const {ReadStream, createReadStream} = require('fs')
const mime = require('mime')

function static(dirname) {
  return async (ctx, next) => {
    let filePath = path.join(dirname, ctx.path)

    try {
      let statObj = await fs.stat(filePath)

      if (!statObj.isFile()) { // 如果是文件夹就查找文件夹下的index.html文件
        filePath = path.join(filePath, 'index.html')
        await fs.access(filePath)
      } 

      ctx.type = `${mime.getType(filePath)};charset=utf-8`
      ctx.body = createReadStream(filePath)
      
    } catch (e) {
      return next()
    }
  }
}

module.exports = static
