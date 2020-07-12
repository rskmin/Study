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

// newListener 在订阅完之前触发
girl.on('newListener', type => {// newListener是一个固定的名字
  // 将回调置入当前执行栈底部，等到订阅完成再触发
  process.nextTick(() => {
    girl.emit(type)
  })
})

girl.once('失恋了', eat)
// girl.once('失恋了', eat)
// girl.once('失恋了', eat)

// girl.emit('失恋了')
// girl.emit('失恋了')
// girl.emit('失恋了')