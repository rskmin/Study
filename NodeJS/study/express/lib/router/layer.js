/* eslint-disable no-return-assign */
/* eslint-disable no-extra-parens */
/* eslint-disable camelcase */
const pathToRegExp = require('path-to-regexp')
function Layer(path, handler) {
  this.path = path
  this.handler = handler
  this.regExp = pathToRegExp(this.path, (this.keys = []), true)
}

Layer.prototype.handle_error = function (err, req, res, next) {
  if (this.handler.length === 4) { // 错误处理中间件
    return this.handler(err, req, res, next)
  }
  // 普通中间件继续向下执行
  next(err)
}

Layer.prototype.match = function (pathname) {
  if (this.path === pathname) { // 完全匹配
    return true
  }

  if (!this.route) { // 中间件是否匹配
    if (this.path === '/') {
      return true
    }
    return pathname.startsWith(this.path + '/')
  }

  // 路由是否匹配
  let matches = pathname.match(this.regExp)
  if (matches) {
    let [, ...values] = matches
    this.params = values.reduce((acc, cur, index) =>
      (acc[this.keys[index].name] = cur , acc)
    , {})
    return true
  }
  return false
}
Layer.prototype.handle_request = function (req, res, next) {
  return this.handler(req, res, next)
}

module.exports = Layer