function EventEmitter() {
  this._events = {}
}

EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    this._events = {}
  }
  let callbacks = this._events[eventName] || []
  callbacks.push(callback)
  this._events[eventName] = callbacks
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn(...args)
    })
  }
}

EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(event => {
      return event !== callback && event.l !== callback
    })
  }
}

EventEmitter.prototype.once = function (eventName, callback) {
  const one = () => {
    callback()
    this.off(eventName, one)
  }
  one.l = callback
  this.on(eventName, one)
}

module.exports = EventEmitter
