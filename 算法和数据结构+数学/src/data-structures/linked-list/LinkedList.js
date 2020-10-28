const LinkedListNode = require('./LinkedListNode');
const Comparator = require('../../utils/Comparator');

/**
 * 链表
 */
class LinkedList {
  /**
   * @param {Function} [comparatorFunction] 链表节点比较方法
   */
  constructor(comparatorFunction) {
    /** @var 链表头指针 @type {LinkedListNode|null} */
    this.head = null;
    /** @var 链表尾指针 @type {LinkedListNode|null} */
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }
  /**
   * 在链表头部添加
   * @param {*} value
   * @returns {LinkedList}
   */
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    !this.tail && (this.tail = newNode);
    return this;
  }
  /**
   * 在链表尾部添加
   * @param {*} value 
   * @returns {LinkedList}
   */
  append(value) {
    const newNode = new LinkedListNode(value);
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
   * @returns {LinkedListNode|null} 最后被删除的节点
   */
  delete(value) {
    if (!this.head) return null;
    let deleteNode = null;
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }
    let currentNode = this.head;
    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    this.compare.equal(this.tail.value, value) && (this.tail = currentNode);
    return deleteNode;
  }
  /**
   * 查找指定节点
   * @param {Object} findParams 
   * @param {Function} [findParams.value] 节点值
   * @param {Function} [findParams.callback] 查找方法优先于节点值
   * @returns {LinkedListNode|null}
   */
  find({ value = undefined, callback }) {
    if (!this.head) return null;
    let currentNode = this.head;
    while (currentNode) {
      // 尝试调用 callback 判断是否找到所需节点
      if (callback && callback(currentNode.value)) return currentNode;
      if (value !== undefined && this.compare.equal(currentNode.value, value)) return currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }
  /**
   * 删除链表尾部节点
   * @returns {LinkedListNode|null}
   */
  deleteTail() {
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    let currentNode = this.head;
    while (currentNode.next) {
      !currentNode.next.next ?
        (currentNode.next = null) :
        (currentNode = currentNode.next);
    }
    this.tail = currentNode;
    return deletedTail;
  }
  /**
   * 删除链表头部节点
   * @returns {LinkedListNode|null}
   */
  deleteHead() {
    if (!this.head) return null;
    const deleteHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deleteHead;
  }
  /**
   * 通过数组构造链表
   * @param {*[]} values
   * @returns {LinkedList}
   */
  fromArray(values) {
    values.forEach(value => this.append(value));
    return this;
  }
  /**
   * 将链表转化为数组
   * @returns {LinkedListNode[]}
   */
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  /**
   * 将链表转化为字符串
   * @param {Function} [callback] 
   * @returns {string}
   */
  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }
  /**
   * 链表反转
   * @returns {LinkedList}
   */
  reverse() {
    /**
     * 递归反转
     * @param {LinkedListNode} node
     * @returns {LinkedListNode|null}
     */
    const _reverse = (node) => {
      if (!node) return;
      const back = _reverse(node.next);
      back ? (back.next = node) : (this.head = node);
      return node;
    }
    this.tail = _reverse(this.head);
    this.tail && (this.tail.next = null);
    return this;
  }
}

module.exports = LinkedList;