const url = require('url')
const Route = require('./route')
const Layer = require('./layer')
const methods = require('methods')

function Router() {
  this.stack = []
}

Router.prototype.route = function (path) {
  let route = new Route()
  let layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  this.stack.push(layer)
  return route
}

methods.forEach(method => {
  Router.prototype[method] = function (path, handlers) {
    let route = this.route(path) // 创造一个route

    route[method](handlers)
  }
})

Router.prototype.handle = function (req, res, out) {
  let { pathname } = url.parse(req.url)
  let idx = 0
  // 将数组里每一项用next链接起来
  let next = () => {
    if (idx >= this.stack.length) return out()
    let layer = this.stack[idx++]
    if (layer.match(pathname)) {
      if (layer.route.methods[req.method.toLowerCase()]) { // 检验该层路由有无匹配的方法
        layer.handle_request(req, res, next) // route.dispatch
      } else {
        return next()
      }
    } else {
      return next()
    }
  }
  next()
}
module.exports = Router