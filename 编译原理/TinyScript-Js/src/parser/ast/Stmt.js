const ASTNode = require('./ASTNode')

/**
 * 抽象语法树抽象声明节点
 */
class Stmt extends ASTNode {
  /**
   * @param {ASTNode} _parent 
   * @param {ASTNodeTypes} _type 
   * @param {string} _label 
   */
  constructor(_parent, _type, _label) {
    super(_parent, _type, _label)
  }
}

module.exports = Stmt