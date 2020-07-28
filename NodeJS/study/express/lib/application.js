/* eslint-disable camelcase */
const http = require('http')
const Router = require('./router')
const methods = require('methods')

function Application() {}

Application.prototype.lazy_route = function () {
  if (!this._router) {
    this._router = new Router()
  }
}

methods.forEach(method => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_route()
    this._router[method](path, handlers)
  }
})


Application.prototype.listen = function () {

  const server = http.createServer((req, res) => {

    // 默认先筛选用户注册的路由，匹配不到调用not found
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this.lazy_route()
    this._router.handle(req, res, done)
  })
  server.listen(...arguments)

}

module.exports = Application