const redis = require('redis');
let client1 = redis.createClient(6379, '127.0.0.1')
let client2 = redis.createClient(6379, '127.0.0.1')

;(async () => {
  // client.set('name', 'rskmin', redis.print)
  // await client.get('name', redis.print)
  client1.subscribe('call')
  client1.on('message', function (channel, message) {
    console.log(message)
  })
  setTimeout(() => {
    client2.publish('call', 'hhhh')
  }, 1000)

})()