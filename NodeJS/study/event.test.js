const EventEmitter = require('./events')
const util = require('util')

function Girl() {}

// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
util.inherits(Girl, EventEmitter)

let girl = new Girl()

let eat = () => {
  console.log('吃')
}

let cry = () => {
  console.log('哭')
}

girl.once('失恋了', eat)
// girl.on('失恋了', cry)

girl.off('失恋了', eat)

girl.emit('失恋了')
girl.emit('失恋了')
girl.emit('失恋了')