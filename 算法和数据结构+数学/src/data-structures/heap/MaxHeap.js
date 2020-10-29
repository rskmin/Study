const Heap = require('./Heap');

/**
 * 最大堆
 */
class MaxHeap extends Heap {
  /**
   * 第一个元素必须总是大于或等于第二个元素
   * @param {*} firstElement 
   * @param {*} secondElement 
   * @returns {boolean}
   */
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.greaterThenOrEqual(firstElement, secondElement);
  }
}

module.exports = Heap;