const Heap = require('./Heap');

/**
 * 最小堆
 */
class MinHeap extends Heap {
  /**
   * 第一个元素必须总是小于或等于第二个元素
   * @param {*} firstElement 
   * @param {*} secondElement 
   * @returns {boolean}
   */
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.lessThenOrEqual(firstElement, secondElement);
  }
}

module.exports = MinHeap;