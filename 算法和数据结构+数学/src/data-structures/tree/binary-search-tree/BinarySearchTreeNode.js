const BinaryTreeNode = require('../BinaryTreeNode');

/**
 * 二叉搜索树节点
 * @extends BinaryTreeNode
 */
class BinarySearchTreeNode extends BinaryTreeNode {
  /**
   * @param {number|null} [value] - 节点的值
   * @param {BinarySearchTreeNode|null} [parent] - 父节点
   * @param {BinarySearchTreeNode|null} [left] - 左节点
   * @param {BinarySearchTreeNode|null} [right] - 右节点
   */
  constructor(value = null, parent = null, left = null, right = null) {
    super(value, parent, left, right);
  }
  /**
   * 插入节点
   * @param {number} value - 二叉搜索树节点值
   * @return {BinarySearchTreeNode} 插入的节点
   */
  insert(value) {
    value = +value;
    if (this.value === null) {
      this.value = value;
      return this;
    }
    if (value <= this.value) { // 插入左节点
      if (this.left) return this.left.insert(value);
      const newNode = new BinarySearchTreeNode(value);
      this.setLeft(newNode);
      return newNode;
    }
    if (value > this.value) { // 插入右节点
      if (this.right) return this.right.insert(value);
      const newNode = new BinarySearchTreeNode(value);
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
    if (this.value === value) return this;
    if (value <= this.value && this.left) return this.left.find(value);
    if (value > this.value && this.right) return this.right.find(value);
    return null;
  }
}

module.exports = BinarySearchTreeNode;