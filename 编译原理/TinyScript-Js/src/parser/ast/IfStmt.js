const Stmt = require('./Stmt')
const ASTNodeTypes = require('./ASTNodeTypes')

/**
 * 抽象语法树 - if 语句节点
 */
class IfStmt extends Stmt {
  /**
   * @param {ASTNode} _parent
   * @param {ASTNodeTypes} _type
   * @param {string} _label
   */
  constructor(_parent) {
    super(_parent, ASTNodeTypes.IF_STMT, 'if')
  }
}

module.exports = IfStmt