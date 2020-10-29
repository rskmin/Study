const Comparator = require('../../utils/Comparator');

/**
 * 最大堆和最小堆的父类
 * 不允许被构造
 */
class Heap {
  /**
   * @param {Function} comparatorFunction 元素比较方法
   */
  constructor(comparatorFunction) {
    if (new.target === Heap) throw new TypeError('Cannot construct Heap instance directly');
    /** @var 堆的数组表示 @type {Array} */
    this.heapContainer = [];
    /** @var 堆元素比较器 @type {Comparator} */
    this.compare = new Comparator(comparatorFunction);
  }
  /**
   * 获取左节点的下标
   * @param {number} parentIndex 父节点下标
   * @returns {number}
   */
  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1;
  }
  /**
   * 获取右节点的下标
   * @param {number} parentIndex 父节点下标
   * @returns {number}
   */
  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2;
  }
  /**
   * 获取父节点下标
   * @param {number} childIndex 子节点下标
   * @returns {number}
   */
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  /**
   * 是否存在父节点
   * @param {number} childIndex 子节点下标
   * @returns {boolean}
   */
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }
  /**
   * 是否存在左子节点
   * @param {number} parentIndex 父节点下标
   * @returns {boolean}
   */
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }
  /**
   * 是否存在右子树节点
   * @param {number} parentIndex 父节点下标
   * @returns {boolean}
   */
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }
  /**
   * 获取左子节点
   * @param {number} parentIndex 父节点下标
   * @returns {*}
   */
  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }
  /**
   * 获取右子节点
   * @param {number} parentIndex 父节点下标
   * @returns {*}
   */
  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }
  /**
   * 获取父节点
   * @param {number} childIndex 子节点下标
   * @returns {number}
   */
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }
  /**
   * 交换两个节点的位置
   * @param {number} indexOne 节点下标1
   * @param {number} indexTwo 节点下标2
   */
  swap(indexOne, indexTwo) {
    const temp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = temp;
  }
  /**
   * 查看堆顶元素
   * @returns {*}
   */
  peek() {
    if (this.heapContainer.length === 0) return null;
    return this.heapContainer[0];
  }
  /**
   * 查找堆中指定的元素的位置
   * @param {*} item 要查找的元素
   * @param {Comparator} comparator 比较器
   * @returns {number[]}
   */
  find(item, comparator = this.compare) {
    const foundItemIndices = [];
    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
      comparator.equal(item, this.heapContainer[itemIndex]) && foundItemIndices.push(itemIndex);
    }
    return foundItemIndices;
  }
  /**
   * 检查是否为空堆
   * @returns {boolean}
   */
  isEmpty() {
    return !this.heapContainer.length;
  }
  /**
   * @returns {string}
   */
  toString() {
    return this.heapContainer.toString();
  }
  /**
   * 比较堆中两个元素的位置是否正确
   * 对于MinHeap，第一个元素必须总是小于或等于第二个元素
   * 对于MaxHeap，第一个元素必须总是大于或等于第二个元素
   * @param {*} firstElement 
   * @param {*} secondElement 
   * @returns {boolean}
   */
  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
  }
  /**
   * 提升一个元素在堆中的位置，直至满足堆序
   * @param {number} [customStartIndex] 指定元素下标
   * @returns {Heap}
   */
  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;
    while (
      this.hasParent(currentIndex)
      && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
    return this;
  }
  /**
   * 降低一个元素在堆中的位置，直至满足堆序
   * @param {number} [customStartIndex] 指定元素下标
   * @returns {Heap}
   */
  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex)
        && this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex),
        )) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }
      if (this.pairIsInCorrectOrder(
        this.heapContainer[currentIndex],
        this.heapContainer[nextIndex],
      )) break;
      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }
  /**
   * 取出堆顶的元素
   * @returns {*}
   */
  poll() {
    if (this.heapContainer.length === 0) return null;
    if (this.heapContainer.length === 1) return this.heapContainer.pop();
    const item = this.heapContainer[0];
    // 填充堆顶
    this.heapContainer[0] = this.heapContainer.pop();
    // 恢复堆序
    // 先把数组的末位元素加到顶端，再通过不断比较与左右孩子的值的大小，决定是否交换，直到满足堆序性为止
    this.heapifyDown()
    return item;
  }
  /**
   * 向堆中添加元素
   * @param {*} item 要插入的内容
   * @returns {Heap}
   */
  offer(item) {
    this.heapContainer.push(item);
    // 恢复堆序
    // 先把新元素加入数组的末尾，再通过不断比较与 parent 的值的大小，决定是否交换，直到满足堆序性为止
    this.heapifyUp();
    return this;
  }
  /**
   * 删除指定内容
   * @param {*} item 要删除的内容
   * @param {Comparator} [comparator] 
   * @returns {Heap}
   */
  remove(item, comparator = this.compare) {
    // 查找到要删除的元素下标
    const numberOfItemsToRemove = this.find(item, comparator).length;
    
    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
      const indexToRemove = this.find(item, comparator).pop();
      if (indexToRemove === (this.heapContainer.length - 1)) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        const parentItem = this.parent(indexToRemove);
        if (
          this.hasLeftChild(indexToRemove)
          && (
            !parentItem
            || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
          )
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }
    return this;
  }
}

module.exports = Heap;