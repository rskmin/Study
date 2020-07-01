const Stmt = require('./Stmt')
const ASTNodeTypes = require('./ASTNodeTypes')

/**
 * 抽象语法树 - 函数声明语句节点
 */
class FunctionDeclareStmt extends Stmt {
  /**
   * @param {ASTNode} _parent
   * @param {ASTNodeTypes} _type
   * @param {string} _label
   */
  constructor(_parent) {
    super(_parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, 'func')
  }
}

module.exports = FunctionDeclareStmt