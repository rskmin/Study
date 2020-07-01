const Stmt = require('./Stmt')
const ASTNodeTypes = require('./ASTNodeTypes')

/**
 * 抽象语法树 - 代码块节点
 */
class Block extends Stmt {
  /**
   * @param {ASTNode} _parent
   * @param {ASTNodeTypes} _type
   * @param {string} _label
   */
  constructor(_parent) {
    super(_parent, ASTNodeTypes.BLOCK, 'block')
  }
}

module.exports = Block