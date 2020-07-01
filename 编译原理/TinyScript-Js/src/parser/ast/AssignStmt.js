const ASTNodeTypes = require('./ASTNodeTypes')
const Stmt = require('./Stmt')

/**
 * 抽象语法树 - 赋值语句节点
 */
class AssignStmt extends Stmt {
  /**
   * @param {ASTNode} _parent
   * @param {ASTNodeTypes} _type
   * @param {string} _label
   */
  constructor(_parent) {
    super(_parent, ASTNodeTypes.ASSIGN_STMt, 'assign')
  }
}

module.exports = AssignStmt