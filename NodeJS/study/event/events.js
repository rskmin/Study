function EventEmitter() {
  this._events = {}
}

/**
 * 事件回调注册方法
 * @param {string} eventName - 事件名称
 * @param {Function} callback - 事件回调
 */
EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    this._events = {}
  }

  // 添加回调触发内部事件
  if (eventName !== 'newListener') {
    if (this._events['newListener']) {
      this.emit('newListener', eventName)
    }
  }

  // 将回调存入缓存中
  let callbacks = this._events[eventName] || []
  callbacks.push(callback)
  this._events[eventName] = callbacks
}

/**
 * 事件发射方法
 * @param {string} eventName - 事件名称
 * @param  {...any} args - 参数列表
 */
EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {// 遍历执行事件回调
    this._events[eventName].forEach(fn => {
      fn(...args)
    })
  }
}

/**
 * 删除某个事件回调的方法
 * @param {string} eventName - 事件名称
 * @param {Function} callback - 回调方法
 */
EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(event => {
      return event !== callback && event.l !== callback
    })
  }
}

/**
 * 注册只触发一次的回调
 * @param {string} eventName - 事件名称
 * @param {Function} callback - 事件回调
 */
EventEmitter.prototype.once = function (eventName, callback) {
  // 对回调进行包装，执行后将自己从回调队列中删除
  const one = () => {
    callback()
    this.off(eventName, one)
  }
  // 暴露出原回调方法便于删除
  one.l = callback
  this.on(eventName, one)
}

module.exports = EventEmitter
