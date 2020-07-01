const Stmt = require('./Stmt')
const ASTNodeTypes = require('./ASTNodeTypes')

/**
 * 抽象语法树 - 声明语句节点
 */
class DeclareStmt extends Stmt {
  /**
   * @param {ASTNode} _parent
   * @param {ASTNodeTypes} _type
   * @param {string} _label
   */
  constructor(_parent) {
    super(_parent, ASTNodeTypes.DECLARE_STMT, 'declare')
  }
}

module.exports = DeclareStmt