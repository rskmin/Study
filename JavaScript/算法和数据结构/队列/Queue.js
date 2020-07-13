const LinkList = require('../链表/LinkList')

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

let queue = new Queue()
queue.offer(1)
queue.offer(2)
console.log(queue.ll)
console.log(queue.remove(0))
console.log(queue.ll)
console.log(queue.peek())

module.exports = Queue