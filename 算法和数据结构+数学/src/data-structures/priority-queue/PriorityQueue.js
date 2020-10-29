const MinHeap = require('../heap/MinHeap');
const Comparator = require('../../utils/Comparator');

/**
 * 默认的值比较器
 */
const valueComparator = new Comparator();

/**
 * 优先队列, 数值低的优先级高
 */
class PriorityQueue extends MinHeap {
  constructor() {
    super();
    // 元素优先级映射
    this.priorities = new Map();
    /** @var 优先级比较器 @type {Comparator} */
    this.compare = new Comparator(this.comparePriority.bind(this));
  }
  /**
   * 比较元素优先级
   * @param {*} a
   * @param {*} b
   * @returns {number}
   */
  comparePriority(a, b) {
    return this.priorities.get(a) - this.priorities.get(b);
  }
  /**
   * 入队 enQueue
   * @param {*} item 入队元素
   * @param {number} [priority] 元素优先级
   * @returns {PriorityQueue}
   */
  offer(item, priority = 0) {
    this.priorities.set(item, priority);
    super.offer(item);
    return this;
  }
  /**
   * 删除优先队列中的指定元素
   * @param {*} item 要删除的元素
   * @param {Comparator} [customFindingComparator] 元素比较方法
   * @returns {PriorityQueue}
   */
  remove(item, customFindingComparator) {
    super.remove(item, customFindingComparator);
    this.priorities.delete(item);
    return this;
  }
  /**
   * 更改元素优先级
   * @param {*} item 
   * @param {*} priority 
   * @returns {PriorityQueue}
   */
  changePriority(item, priority) {
    this.remove(item, valueComparator);
    this.offer(item, priority);
    return this;
  }
  /**
   * 寻找指定元素
   * @param {*} item 元素值
   */
  findByValue(item) {
    return this.find(item, valueComparator);
  }
  /**
   * 判断有无指定值
   * @param {*} item 元素值
   */
  hasValue(item) {
    return this.findByValue(item).length > 0;
  }
}

module.exports = PriorityQueue;