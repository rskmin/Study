const LinkedList = require('../linked-list/LinkedList');
const LinkedListNode = require('../linked-list/LinkedListNode');

/**
 * 默认哈希表大小
 */
const DEFAULT_HASH_TABLE_SIZE = 32;

/**
 * 哈希散列表
 * 结合数组快速查找的优点和链表快速插入删除的优点
 */
class HashTable {
  /**
   * @param {number} hashTableSize 哈希表大小
   */
  constructor(hashTableSize = DEFAULT_HASH_TABLE_SIZE) {
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
    this.keys = {};
  }
  /**
   * 利用字符串的字节码和来计算散列值
   * @param {string} key 键
   * @return {number} 散列值
   */
  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );
    return hash % this.buckets.length;
  }
  /**
   * 通过键值向hash表存储数据
   * @param {string} key 键
   * @param {*} value 值
   * @returns {HashTable}
   */
  set(key, value) {
    // 获取该键的hash值
    const keyHash = this.keys[key] || this.hash(key);
    // 保存hash值
    this.keys[key] = keyHash;
    // 通过hash值索引到存储链表
    const bucketLinkedList = this.buckets[keyHash];
    // 检查链表中是否存在该键值
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });
    !node ?
      bucketLinkedList.append({ key, value }) :
      (node.value.value = value);
    return this;
  }
  /**
   * 删除键值
   * @param {string} key 键
   * @returns {LinkedListNode|null}
   */
  delete(key) {
   const keyHash = this.keys[key] || this.hash(key);
   delete this.keys[key];
   const bucketLinkedList = this.buckets[keyHash];
   const node = bucketLinkedList.find({ callback: (nodeVue) => nodeVue.key === key });
   if (node) return bucketLinkedList.delete(node.value);
   return null;
  }
  /**
   * 获取指定键所对应的值
   * @param {string} key 键
   * @returns {any}
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.keys[key] || this.hash(key)];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });
    return node ? node.value.value : null;
  }
  /**
   * 检查是否有指定键
   * @param {string} key 键
   * @returns {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }
  /**
   * 获取已有的键
   * @returns {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }
}

module.exports = HashTable;