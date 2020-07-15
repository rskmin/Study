const fs = require('fs')
const EventEmitter = require('events')
const path = require('path')

// 获取队列模块
const pathArr = __dirname.split('\\')
const studyPath = pathArr.includes('Study') && pathArr.slice(0, pathArr.indexOf('Study') + 1).join('\\')
const QueuePath = path.resolve(studyPath, 'JavaScript', '算法和数据结构', '队列', 'Queue.js')
let Queue
if (QueuePath) {
  try {
    Queue = require(QueuePath)
  } catch (e) {
    throw new Error('模块获取失败')
  }
} else {
  throw new Error('路径查找失败')
} 

class WriteStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.encoding = options.encoding || 'utf8'
    this.start = options.start || 0
    this.mode = options.mode || 0o666
    this.highWaterMark = options.highWaterMark || 16*1024

    // 区分当前是否正在写入
    this.writing = false

    this.len = 0// 维护写入个数
    this.needDrain = false// 当前是否需要触发drain事件
    this.offset = this.start// 写入的位置
    this.cache = new Queue()

    //打开文件
    this.open()
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  write(chunk, encoding, cb) {
    // 将写入的数据转化成 buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length
    let flag = this.len < this.highWaterMark
    // 如果写入的内容个数大于等于hightWaterMark 就需要触发drain事件
    this.needDrain = !flag
    
    if (this.writing) {// 将当前写入内容保存到链表中
      // 暂存当前的操作
      this.cache.offer({
        chunk,
        encoding,
        cb
      })
    } else {// 第一次，将数据写到文件中
      this.writing = true

      this._write(chunk, encoding, () => {
        cb && cb()
        this.clearBuffer() // 清空缓存
      })
    }

    return flag
  }
  clearBuffer() {
    try {
      let data = this.cache.remove()
      let {chunk, encoding, cb} = data.element
      this._write(chunk, encoding, () => {
        cb && cb()
        this.clearBuffer() // 清空缓存
      })
    } catch (e) {
      this.writing = false
      if (this.needDrain) {
        this.needDrain = false
        this.emit('drain')
      }
    }
  }
  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb))
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.len -= written // 写入后缓存数减少
      this.offset += written // 偏移量增加
      cb()
    })
  }
}

module.exports = WriteStream