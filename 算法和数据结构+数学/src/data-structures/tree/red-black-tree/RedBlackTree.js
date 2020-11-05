const BinarySearchTree = require('../binary-search-tree/BinarySearchTree');
const BinarySearchTreeNode = require('../binary-search-tree/BinarySearchTreeNode');

/** 红黑树颜色枚举 */
const RED_BLACK_TREE_COLORS = {
  red: 'red',
  black: 'black',
};

/** 颜色属性常量 */
const COLOR_PROP_NAME = 'color';

/**
 * 红黑树
 * @extends {BinarySearchTree}
 */
class RedBlackTree extends BinarySearchTree {
  /**
   * 插入节点
   * @param {*} value 红黑树节点值
   * @returns {BinarySearchTreeNode}
   */
  insert(value) {
    const insertNode = super.insert(value);

  }
}