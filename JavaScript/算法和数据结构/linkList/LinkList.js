/* eslint-disable no-extra-parens */
/* eslint-disable no-param-reassign */
class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkList {
  constructor() {
    this.head = null// 默认指向第一个节点
    this.size = 0// 链表长度
  }
  add(index, element) {
    if (arguments.length === 1) {// 在尾部添加元素
      element = index// 传入的参数作为element
      index = this.size
    }
    if (index < 0 || index > this.size) {
      throw new Error('索引错误')
    }
    if (index === 0) {// 在头部添加元素
      let head = this.head
      this.head = new Node(element, head)
    } else {
      // 获取前一个
      let current = this.head
      for (let i = 0; i < index - 1; i++) {
        current = current.next
      }
      current.next = new Node(element, current.next)
    }
    this.size++
  }
  remove(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('索引错误')
    }
    let res
    if (index === 0) {
      res = this.head
      this.head = this.head.next
    } else {
      // 获取前一个
      let current = this.head
      for (let i = 0; i < index - 1; i++) {
        current = current.next
      }
      res = current.next
      current.next = current.next.next
    }
    this.size--
    return res
  }
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('索引错误')
    }
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next
    }
    return current
  }
  reverse() {
    function reverseRecursion(head) {
      if (head == null || head.next == null) {
        return head
      }
      let newHead = reverseRecursion(head.next)
      head.next.next = head
      head.next = null
      return newHead
    }
    return (this.head = reverseRecursion(this.head))
  }
  reverseLoop() {
    let head = this.head
    let newHead = null

    while (head !== null) {
      let temp = head.next
      head.next = newHead
      newHead = head
      head = temp
    }
    this.head = newHead
    return newHead
  }
}

module.exports = LinkList