/**
 * 链表节点
 */
class LinkedListNode {
  /**
   * @param {*} value 节点值
   * @param {LinkedListNode｜null} next 下一个节点
   */
  constructor(value, next = null) {
    this.value = value;
    /** @var 下一个节点 @type {LinkedListNode|null} */
    this.next = next;
  }
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

module.exports = LinkedListNode;