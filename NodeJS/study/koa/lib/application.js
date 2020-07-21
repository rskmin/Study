const EventEmitter = require('events')
const http = require('http')
const Stream = require('stream')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends EventEmitter {
  constructor() {
    super()
    // 多个应用不共享上下文
    this.context = Object.create(context)
    this.response = Object.create(response)
    this.request = Object.create(request)

    this.middlewares = []
  }
  use(callback) {
    this.middlewares.push(callback)
  }
  createContext(req, res) {
    // 每次请求不共享上下文
    let ctx = Object.create(this.context)
    let _request = Object.create(this.request)
    let _response = Object.create(this.response)
    ctx.request = _request
    ctx.req = ctx.request.req = req
    ctx.response = _response
    ctx.res = ctx.response.res = res
    return ctx
  }
  compose(ctx) {
    // 将多个promise链接到一起 组成一个promise链 依次执行
    let index = -1 // 默认计数
    const dispatch = i => {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      if (i === this.middlewares.length) return Promise.resolve()
      let middleware = this.middlewares[i]

      // await next() -> await dispatch(i+1)
      // dispatch 方法返回的是一个Promise
      return Promise.resolve(middleware(ctx, () => dispatch(i+1))) // 延迟函数next, 调用next方法会找到下一个中间件执行
    }
    return dispatch(0)
    // return this.middlewares.reduce((acc, cur) => {
    //   return Promise.resolve(acc(ctx, () => cur))
    // })
  }
  handleRequest() {
    return (req, res) => {
      let ctx = this.createContext(req, res)
      res.statusCode = 404
      this.compose(ctx).then(() => {
        let body = ctx.body
        if (body) {
          if (body instanceof Stream) {
            body.pipe(res)
          } else if (typeof body === 'object') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(body))
          } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
            res.end(body)
          } else if (typeof body === 'number') {
            res.end(String(body))
          }
        } else {
          res.end('Not Found')
        }
      })

    }
  }
  listen(...args) {
    let server = http.createServer(this.handleRequest())
    server.listen(...args)
  }
}

module.exports = Application