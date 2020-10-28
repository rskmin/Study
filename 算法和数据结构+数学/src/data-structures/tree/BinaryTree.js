const BinaryTreeNode = require('./BinaryTreeNode');

/**
 * 二叉树
 */
class BinaryTree {
  #initHeight = 0
  #initDepth = 0
  /**
   * @param {BinaryTreeNode} [root] - 二叉树根节点
   * @param {number} [initHeight] - 二叉树初始高度
   * @param {number} [initDepth] - 二叉树初始深度
   */
  constructor(root = new BinaryTreeNode(), initHeight = 0, initDepth = 0) {
    this.root = root;
    this.#initHeight = initHeight;
    this.#initDepth = initDepth;
  }
  /**
   * @return {number}
   */
  get initHeight() {
    return this.#initHeight;
  }
  /**
   * @return {number}
   */
  get initDepth() {
    return this.#initDepth;
  }
  /**
   * 获取该节点的高度
   * @param {BinaryTreeNode|null} node - 二叉树节点
   */
  getHeight(node = this.root) {
    if (node === null) return (this.#initHeight ? 0 : -1);
    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }
  /**
   * 获取指定节点的深度位置
   * @param {BinaryTreeNode} node - 二叉树节点
   */
  getDepth(node) {
    let depth = this.#initDepth;
    while (node.parent) {
      depth++;
      node = node.parent;
    }
    return depth;
  }
  /**
   * 获取指定节点的平衡因子
   * @param {BinaryTreeNode} node - 二叉树节点
   */
  getBalanceFactor(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
}

module.exports = BinaryTree;