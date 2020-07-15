const ReadStream = require('../readStream/readStream')
const WriteStream = require('../writeStream/writeStream')
const path = require('path')

let rs = new ReadStream(path.resolve(__dirname, 'copy.txt'))
let ws = new WriteStream(path.resolve(__dirname, 'write.txt')) 
rs.pipe(ws)