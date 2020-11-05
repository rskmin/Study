const Comparator = require('../../../utils/Comparator');
const BinaryTreeNode = require('../BinaryTreeNode');

/**
 * 二叉搜索树节点
 * @extends BinaryTreeNode
 */
class BinarySearchTreeNode extends BinaryTreeNode {
  /**
   * @param {number|null} [value] 节点的值 
   * @param {function} compareFunction 节点比较方法
   */
  constructor(value = null, compareFunction = undefined) {
    super(value);
    /** @var 节点值比较方法 @type {Comparator} */
    this.compareFunction = compareFunction;
    /** @var 节点值比较器 @type {Comparator} */
    this.nodeValueComparator = new Comparator(compareFunction);
  }
  /**
   * 插入节点
   * @param {number} value - 二叉搜索树节点值
   * @return {BinarySearchTreeNode} 插入的节点
   */
  insert(value) {
    value = +value;
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value;
      return this;
    }
    if (this.nodeValueComparator.lessThan(value, this.value)) { // 插入左节点
      if (this.left) return this.left.insert(value);
      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setLeft(newNode);
      return newNode;
    }
    if (this.nodeValueComparator.greaterThan(value, this.value)) { // 插入右节点
      if (this.right) return this.right.insert(value);
      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setRight(newNode);
      return newNode;
    }
    return this;
  }
  /**
   * 查找指定值所在的二叉搜索树节点
   * @param {number} value - 要查找的值
   */
  find(value) {
    if (this.nodeValueComparator.equal(this.value, value)) return this;
    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) return this.left.find(value);
    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) return this.right.find(value);
    return null;
  }
  /**
   * 是否存在指定值
   * @param {*} value 指定值
   * @returns {boolean}
   */
  contains(value) {
    return !!this.find(value);
  }
  /**
   * 寻找最小值
   * @returns {BinarySearchTreeNode}
   */
  findMin() {
    if (!this.left) return this;
    return this.left.findMin();
  }
}

module.exports = BinarySearchTreeNode;