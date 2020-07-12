// node 中将文件读取 再次进行了封装操作，封装成了流的操作

// 通过流的方式去读取文件，基于文件操作的方式来封装(文件流)
const fs = require('fs')
const ReadStream = require('./readStream')

// 创建可读流对象
const rs = new ReadStream('../test.json', {
  flags: 'r',// 操作文件的标识
  mode: 0o666,// 当前可读可写
  autoClose: true,// 读取完毕后关闭文件
  encoding: null,// null 表示的是buffer 读取地编码
  start: 0,// 从文件的哪个位置开始读取
  // end: 3,// 读取到文件的哪个位置
  highWaterMark: 2// 每次读取几个
})

const arr = []
// 可读流继承于事件模块
rs.on('open', function(fd) {
  console.log('open' ,fd)
})

rs.on('error', function(err) {
  console.log('error')
})

rs.on('data', data => {
  console.log(data)
  arr.push(data)
})
rs.pause()
setTimeout(() => {
  rs.resume()
}, 1000)

// rs.on('end', () => {
//   console.log(Buffer.concat(arr).toString())
// })