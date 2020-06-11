const LinkedList = require('linkedlist')

const CACHE_SIZE = 10
class PeekIterator {

  constructor(it, endToken = null) {
    this.it = it
    // 需要putBack的元素
    this.stackPutBacks = new LinkedList()

    // 基于时间窗口的缓存
    this.queueCache = new LinkedList()

    this.endToken = endToken
  }

  /**
   * 视察下一个迭代对象
   */
  peek() {
    if (this.stackPutBacks.length > 0) {
      return this.stackPutBacks.head
    }
    const val = this.next()
    this.putBack()
    return val
  }

  /**
   * 回退上一个迭代对象
   */
  putBack() {
    if (this.queueCache.length > 0) {
      this.stackPutBacks.push(this.queueCache.pop())
    }
  }

  /**
   * 是否还有迭代对象
   */
  hasNext() {
    return this.endToken || Boolean(this.peek())
  }

  /**
   * 获取下一个迭代对象
   */
  next() {
    let val = null

    if (this.stackPutBacks.length > 0) {
      val = this.stackPutBacks.pop()
    } else {
      val = this.it.next().value
      // eslint-disable-next-line no-undefined
      if (val === undefined) {
        const tmp = this.endToken
        this.endToken = null
        return tmp
      }
    }

    // 处理缓存
    while (this.queueCache.length > CACHE_SIZE - 1) {
      // 超过上限，清除一个缓存
      this.queueCache.shift()
    }
    this.queueCache.push(val)

    return val
  }
}

module.exports = PeekIterator