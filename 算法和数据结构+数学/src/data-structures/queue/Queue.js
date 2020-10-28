const LinkedList = require('../linked-list/LinkedList');
const LinkedListNode = require('../linked-list/LinkedListNode');

/**
 * 队列
 */
class Queue {
  constructor() {
    this.linkedList = new LinkedList;
  }
  /**
   * 判断队列是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return !this.linkedList.head;
  }
  /**
   * 检查队列头部节点的值
   * @returns {*} 队列头部节点的值
   */
  peek() {
    if (!this.linkedList.head) return null;
    return this.linkedList.head.value;
  }
  /**
   * 入队操作
   * @param {*} value
   * @returns {Queue}
   */
  enqueue(value) {
    this.linkedList.append(value);
    return this;
  }
  /**
   * 出队操作
   * @returns {LinkedListNode} 出队节点
   */
  dequeue() {
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

module.exports = Queue;