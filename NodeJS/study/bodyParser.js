/* eslint-disable callback-return */
const querystring = require('querystring')

function bodyParserPlugin() {
  return async (ctx, next) => {
    let body = await new Promise((resolve, reject) => {
      let arr = []
      ctx.req.on('data', function (chunk) {
        arr.push(chunk)
      })
      ctx.req.on('end', function () {
        resolve(Buffer.concat(arr).toString())
      })
    })
    ctx.request.body = querystring.parse(body, '&', '=')|| {}
    await next()
  }
}

module.exports = bodyParserPlugin