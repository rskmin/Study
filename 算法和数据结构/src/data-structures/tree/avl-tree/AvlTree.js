const BinarySearchTree = require('../binary-search-tree/BinarySearchTree');
const BinarySearchTreeNode = require('../binary-search-tree/BinarySearchTreeNode');

/**
 * AVL Tree - 平衡二叉搜索树
 * @extends BinarySearchTree
 */
class AvlTree extends BinarySearchTree {
  /**
   * 插入节点并使二叉树平衡
   * @param {value} value - 平衡二叉搜索树节点值
   */
  insert(value) {
    // 二叉搜索树正常插入
    super.insert(value);
    // 检查平衡情况并调整
    let currentNode = this.root.find(value);
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
  }
  /**
   * AVL树的平衡方法
   * @param {BinarySearchTreeNode} node 
   */
  balance(node) {
    const getBalanceFactor = this.getBalanceFactor.bind(this);
    // 如果平衡因子超出范围，开始平衡二叉树
    if (getBalanceFactor(node) > 1) {
      // Left
      if (getBalanceFactor(node.left) > 0) {
        // Left-Left
        this.singleTurnRight(node);
      } else if (getBalanceFactor(node.left) < 0) {
        // Left-Right
        this.leftRightTurnAround(node);
      }
    } else if (getBalanceFactor(node) < -1) {
      // Right
      if (getBalanceFactor(node.right) < 0) {
        // Right-Right
        this.singleTurnLeft(node);
      } else if (getBalanceFactor(node.right) > 0) {
        // Right-Left
        this.rightLeftTurnAround(node);
      }
    }
  }
  /**
   * 右单转 - 节点被 Left-Left 插入时
   * @param {BinarySearchTreeNode} node 
   */
  singleTurnRight(node) {
    const leftNode = node.left;
    node.setLeft(null);
    if (node.parent) {
      node.parent.setLeft(leftNode);
    } else if (node === this.root) {
      this.root = leftNode;
    }
    if (leftNode.right) {
      node.setLeft(leftNode.right);
    }
    leftNode.setRight(node);
  }
  /**
   * 左右双转 - 节点被 Left-Right 插入时
   * @param {BinarySearchTreeNode} node 
   */
  leftRightTurnAround(node) {
    const leftNode = node.left;
    node.setLeft(null);

    const leftRightNode = leftNode.right;
    leftNode.setRight(null);
    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
    }
    leftRightNode.setLeft(leftNode);
    node.setLeft(leftRightNode);

    this.singleTurnRight(node);
  }
  /**
   * 左单转 - 节点被 Right-Right 插入时
   * @param {BinarySearchTreeNode} node 
   */
  singleTurnLeft(node) {
    const rightNode = node.right;
    node.setRight(null);

    if (node.parent) {
      node.parent.setRight(rightNode);
    } else if (node === this.root) {
      this.root = rightNode;
    }

    if (rightNode.left) node.setRight(rightNode.left);

    rightNode.setLeft(node);
  }
  /**
   * 右左双转 - 节点被 Right-Left 插入时
   * @param {BinarySearchTreeNode} node 
   */
  rightLeftTurnAround(node) {
    const rightNode = node.right;
    node.setRight(null);

    const rightLeftNode = rightNode.left;
    rightNode.setLeft(null);
    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
    }
    rightLeftNode.setRight(rightNode);
    node.setRight(rightLeftNode);

    this.singleTurnLeft(node);
  }
}

const tree = new AvlTree();

module.exports = AvlTree;