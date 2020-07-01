const Factor = require('./Factor')
const ASTNodeTypes = require('./ASTNodeTypes')

/**
 * 抽象语法树 - 标量节点
 */
class Scalar extends Factor {
  /**
   * 
   * @param {ASTNode} _parent
   * @param {PeekTokenIterator} it
   */
  constructor(_parent, it) {
    super(_parent, it)
  }
}

module.exports = Scalar