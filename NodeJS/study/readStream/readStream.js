const fs = require('fs')
const EventEmitter = require('events')

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    // 将参数绑定到实例上，实例能够通过this快速获取参数
    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 0o666
    this.encoding = options.encoding || null
    this.start = options.start || 0
    this.end = options.end || null
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.autoClose = options.autoClose || true

    // 文件读取位置
    this.pos = this.start
    // 是否正在读取
    this.flowing = false

    // 1) 默认new的时候就会打开文件
    this.open()

    this.on('newListener', type => {
      if (type === 'data') {// 如果用户监听了data事件就开始读取文件
        this.flowing = true
        this.read()
      }
    })
  }
  pause() {
    this.flowing = false
  }
  resume() {
    this.flowing = true
    this.read()
  }
  pipe(ws) {
    this.on('data', function(data) {
      let flag = ws.write(data)
      if (!flag) {
        this.pause
      }
    })
    ws.on('drain', () => {
      this.resume()
    })
  }
  open() {
    // I/O 操作 异步操作
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit('error', err)
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }
  read() {
    if (typeof this.fd !== 'number') {// 等到文件成功打开后才允许执行读取
      return this.once('open', this.read)
    }
    // 根据heighWaterMark 限制读取的大小
    const buffer = Buffer.alloc(this.highWaterMark)

    if (!this.flowing) {
      return
    }

    fs.read(this.fd, buffer, 0, this.highWaterMark, this.pos, (err, bytesRead) => {
      if (bytesRead) {
        this.pos += bytesRead
        this.emit('data', buffer.slice(0, bytesRead))
        this.read()
      } else {
        this.emit('end')
        if (this.autoClose) {
          fs.close(this.fd, () => {
            this.emit('close')
          })
        }
      }
    })
  }
}

module.exports = ReadStream