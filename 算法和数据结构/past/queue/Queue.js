const LinkList = require('../linkList/LinkList')

class Queue {
  constructor() {
    this.ll = new LinkList()
  }
  offer(element) {// 向队列中添加
    this.ll.add(element)
  }
  peek() {// 查看第一个
    return this.ll.get(0)
  }
  remove() {
    return this.ll.remove(0)
  }
}

module.exports = Queue