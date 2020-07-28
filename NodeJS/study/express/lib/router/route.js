const Layer = require('./layer')
const methods = require('methods')

function Route() {
  this.stack = []
  this.methods = {}
}

Route.prototype.dispatch = function (req, res, out) {
  let requestMethod = req.method.toLowerCase()
  let idx = 0
  let next = () => {
    if (idx >= this.stack.length) return out()
    let layer = this.stack[idx++]
    if (layer.method === requestMethod) {
      layer.handle_request(req, res, next)
    } else {
      return next()
    }
  }
  next()
}

methods.forEach(method => {
  Route.prototype[method] = function (handlers) {
    for (let i = 0, len = handlers.length; i < len; i++) {
      let layer = new Layer('/', handlers[i])
      layer.method = method
      this.methods[method] = true
      this.stack.push(layer)
    }
  }
})

module.exports = Route