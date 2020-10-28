const DoublyLinkedListNode = require('./DoublyLinkedListNode');
const LinkList = require('../linked-list/LinkedList');
const Comparator = require('../../utils/Comparator');

/**
 * 双向链表
 * @extends {LinkList}
 */
class DoublyLinkedList extends LinkList {
  /**
   * @param {Comparator} comparatorFunction 节点值比较方法
   */
  constructor(comparatorFunction) {
    super(comparatorFunction);
    /** @var 链表头指针 @type {DoublyLinkedListNode|null} */
    this.head = null;
    /** @var 链表尾指针 @type {DoublyLinkedListNode|null} */
    this.tail = null;
  }
  /**
   * 在链表头部添加
   * @param {*} value
   * @returns {DoublyLinkedList}
   */
  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head);
    this.head && (this.head.previous = newNode);
    this.head = newNode;
    !this.tail && (this.tail = newNode);
    return this;
  }
  /**
   * 在链表尾部添加
   * @param {*} value 
   * @returns {DoublyLinkedList}
   */
  append(value) {
    const newNode = new DoublyLinkedListNode(value, null, this.tail);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }
  /**
   * 删除链表中所有指定值
   * @param {*} value
   * @returns {DoublyLinkedListNode|null} 最后被删除的节点
   */
  delete(value) {
    if (!this.head) return null;
    let deletedNode = null;
    /** @var 当前节点 @type {DoublyLinkedListNode|null} */
    let currentNode = this.head;

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode;
        if (deletedNode === this.head) {
          this.head = deletedNode.next;
          this.head ? (this.head.previous = null) : (this.tail = null);
        } else if (deletedNode === this.tail) {
          this.tail = deletedNode.previous;
          this.tail.next = null;
        } else {
          const previousNode = deletedNode.previous;
          const nextNode = deletedNode.next;
          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }
      currentNode = currentNode.next;
    }
    return deletedNode;
  }
  /**
   * 查找指定节点
   * @param {Object} findParams 
   * @param {Function} [findParams.value] 节点值
   * @param {Function} [findParams.callback] 查找方法优先于节点值
   * @returns {DoublyLinkedListNode|null}
   */
  find({ value = undefined, callback }) {
    if (!this.head) return null;
    /** @var 当前节点 @type {DoublyLinkedListNode|null} */
    let currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) return currentNode;
      if (value !== undefined && this.compare.equal(currentNode.value, value)) return currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }
  /**
   * 删除链表尾部节点
   * @returns {DoublyLinkedListNode|null}
   */
  deleteTail() {
    if (!this.tail) return null;
    if (this.head === this.tail) {
      const deletedTail = this.tail;
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    const deletedTail = this.tail;
    this.tail = this.tail.previous;
    this.tail.next = null;
    return deletedTail;
  }
  /**
   * 删除链表头部节点
   * @returns {DoublyLinkedListNode|null}
   */
  deleteHead() {
    if (!this.head) return null;
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  }
  /**
   * 链表反转
   * @returns {DoublyLinkedList}
   */
  reverse() {
    /**
     * 递归反转
     * @param {DoublyLinkedListNode} node
     * @returns {DoublyLinkedListNode|null}
     */
    const _reverse = (node) => {
      if (!node) return;
      const back = _reverse(node.next);
      back ?
        (back.next = node, node.previous = back) :
        (this.head = node, node.previous = null);
      return node;
    }
    this.tail = _reverse(this.head);
    this.tail && (this.tail.next = null);
    return this;
  }
}

module.exports = DoublyLinkedList;