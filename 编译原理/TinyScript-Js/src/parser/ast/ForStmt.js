const Stmt = require('./Stmt')
const ASTNodeTypes = require('./ASTNodeTypes')

/**
 * 抽象语法树 - for语句节点
 */
class ForStmt extends Stmt {
  /**
   * @param {ASTNode} _parent
   * @param {ASTNodeTypes} _type
   * @param {string} _label
   */
  constructor(_parent) {
    super(_parent, ASTNodeTypes.FOR_STMT, 'for')
  }
}

module.exports = ForStmt