const Factor = require('./Factor')
const ASTNodeTypes = require('./ASTNodeTypes')

/**
 * 抽象语法树 - 变量节点
 */
class Variable extends Factor {
  /**
   * 
   * @param {ASTNode} _parent
   * @param {PeekTokenIterator} it
   */
  constructor(_parent, it) {
    super(_parent, it)
  }
}

module.exports = Variable