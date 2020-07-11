const EventEmitter = require('events')

let events = new EventEmitter()

console.log(EventEmitter.toString())
// events.on('我饿了', () => {
//   console.log('做饭')
// })

// events.on('我饿了', () => {
//   console.log('吃饭')
// })

// events.emit('我饿了')