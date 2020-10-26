const BinarySearchTreeNode = require('./BinarySearchTreeNode');
const BinaryTree = require('../BinaryTree');

/**
 * 二叉搜索树
 * @extends BinaryTree
 */
class BinarySearchTree extends BinaryTree {
  /**
   * @param {BinarySearchTreeNode} [root] - 二叉搜索树根节点
   * @param {number} [initHeight] - 二叉树初始高度
   * @param {number} [initDepth] - 二叉树初始深度
   */
  constructor(root = new BinarySearchTreeNode(), initHeight = 0, initDepth = 0) {
    super(root, initHeight, initDepth);
  }
  /**
   * 插入节点
   * @param {value} value - 二叉搜索树节点值
   * @return {BinarySearchTreeNode} 插入的节点
   */
  insert(value) {
    return this.root.insert(value);
  }
}

module.exports = BinarySearchTree;