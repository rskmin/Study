const LinkedListNode = require('../linked-list/LinkedListNode');

/**
 * 双向链表节点
 * @extends {LinkedListNode}
 */
class DoublyLinkedListNode extends LinkedListNode {
  /**
   * @param {*} value 节点值
   * @param {DoublyLinkedListNode|null} next 下一个节点
   * @param {DoublyLinkedListNode|null} previous 上一个节点
   */
  constructor(value, next = null, previous = null) {
    super(value, next);
    this.previous = previous
  }
}

module.exports = DoublyLinkedListNode;