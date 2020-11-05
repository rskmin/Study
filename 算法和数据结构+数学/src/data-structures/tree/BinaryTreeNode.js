const Comparator = require('../../utils/Comparator');
const Visitor = require('../../utils/Visitor');
const HashTable = require('../hash-table/HashTable');

/**
 * 二叉树的节点
 */
class BinaryTreeNode {
  /**
   * @param {*} [value] - 节点的值
   */
  constructor(value = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    /** @var 存储信息元 @type {HashTable} */
    this.meta = new HashTable();
    /** @var 节点比较器 @type {Comparator} */
    this.nodeComparator = new Comparator();
  }
  /**
   * 设置左节点
   * @param {BinaryTreeNode|null} node - 二叉树节点
   * @return {BinaryTreeNode}
   */
  setLeft(node) {
    this.left && (this.left.parent = null);
    this.left = node;
    this.left && (this.left.parent = this);
    return this;
  }
  /**
   * 设置右节点
   * @param {BinaryTreeNode|null} node - 二叉树节点
   * @return {BinaryTreeNode}
   */
  setRight(node) {
    this.right && (this.right.parent = null);
    this.right = node;
    this.right && (this.right.parent = this);
    return this;
  }
  /**
   * 前序遍历
   * @param {Visitor} visitor 
   */
  preorderTraversal(visitor) {
    /**
     * 前序遍历方法
     * @param {BinaryTreeNode} node 
     */
    const traversal = node => {
      if (!node) return;
      visitor.visit(node.value); // 访问者接口
      traversal(node.left);
      traversal(node.right);
    }
    traversal(this);
  }
  /**
   * 中序遍历
   * @param {Visitor} visitor 
   */
  inorderTraversal(visitor) {
    /**
     * 前序遍历方法
     * @param {BinaryTreeNode} node 
     */
    const traversal = node => {
      if (!node) return;
      traversal(node.left)
      visitor.visit(node.value)
      traversal(node.right)
    }
    traversal(this);
  }
  /**
   * 后序遍历
   * @param {Visitor} visitor 
   */
  postorderTraversal(visitor) {
    /**
     * 前序遍历方法
     * @param {BinaryTreeNode} node 
     */
    const traversal = node => {
      if (!node) return;
      traversal(node.left);
      traversal(node.right);
      visitor.visit(node.value);
    }
    traversal(this);
  }
  /**
   * 前序遍历所有节点输出节点值
   * @returns {string}
   */
  toString() {
    const values = [];
    this.preorderTraversal(new Visitor(value => values.push(value)));
    return values.toString();
  }
}

module.exports = BinaryTreeNode;
