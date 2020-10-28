const LinkedList = require('../linked-list/LinkedList');
const LinkedListNode = require('../linked-list/LinkedListNode');

class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }
  /**
   * 判断堆栈是否为空
   */
  isEmpty() {
    return !this.linkedList.head;
  }
  /**
   * 入栈
   * @param {*} value 
   * @returns {Stack}
   */
  push(value) {
    this.linkedList.prepend(value);
    return this;
  }
  /**
   * 出栈
   * @returns {LinkedListNode} 出栈的节点
   */
  pop() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }
  /**
   * @param {Function} [callback]
   * @returns {string}
   */
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}

module.exports = Stack;