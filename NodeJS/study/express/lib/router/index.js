/* eslint-disable no-param-reassign */
const url = require('url')
const Route = require('./route')
const Layer = require('./layer')
const methods = require('methods')

let proto = {}

function Router() {
  let router = (req, res, next) => {
    // 调用子路由系统处理逻辑
    router.handle(req, res, next)
  }
  router.stack = []
  Object.setPrototypeOf(router, proto)
  return router
}

proto.use = function (path, handler) {
  let newPath = path
  if (typeof handler !== 'function') {
    newPath = '/'
  }
  Array.from(arguments).forEach(item => {
    if (typeof item == 'function') {
      let layer = new Layer(newPath, item)
      this.stack.push(layer)
    }
  })
}

proto.route = function (path) {
  let route = new Route()
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  this.stack.push(layer)
  return route
}

methods.forEach(method => {
  proto[method] = function (path, handlers) {
    handlers = Array.isArray(handlers) ? handlers : [handlers]
    let route = this.route(path) // 创造一个route

    route[method](handlers)
  }
})

proto.handle = function (req, res, out) {
  let { pathname } = url.parse(req.url)
  let idx = 0
  // 将数组里每一项用next链接起来
  let removed = ''
  let next = (err) => {
    if (idx >= this.stack.length) return out()
    let layer = this.stack[idx++]

    if (removed.length) {
      req.url = removed + req.url
    }

    if (err) {
      // 寻找错误处理中间件(1.中间件 2.四个参数)
      if (!layer.route) {
        layer.handle_error(err, req, res, next)
      } else {
        next(err)
      }

    }

    if (layer.match(pathname)) { // 匹配路径

      if (!layer.route) { // 中间件
        if (layer.handler.length !== 4) {
          layer.handle_request(req, res, next) // route.dispatch
        }
      } else if (layer.route.methods[req.method.toLowerCase()]) { // 路由
        req.params = layer.params
        if (layer.path !== '/') {
          removed = layer.path
          req.url = pathname.slice(removed.length)
        }
        layer.handle_request(req, res, next) // route.dispatch
      }
      // 正常情况不执行错误处理中间件
    }

    return next()
  }
  next()
}

module.exports = Router