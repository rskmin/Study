const fs = require('fs')
const path = require('path')
const WriteStream = require('./writeStream')

let ws = new WriteStream(path.resolve(__dirname, 'copy.txt'), {
  highWaterMark: 3
})

let i = 0
function write() {
  let write = true
  while (i < 10 && write) {
    write = ws.write(i+++'')
  }
  // if (i === 10) {
  //   ws.end()
  // }
}

ws.on('drain', function() {
  console.log('drain')
  write()
})

write()