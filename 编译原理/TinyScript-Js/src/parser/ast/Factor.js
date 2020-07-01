const ASTNode = require('./ASTNode')
const TokenType = require('../../lexer/TokenType')
const ASTNodeTypes = require('./ASTNodeTypes')

/**
 * 因子(抽象类) - 操作符两边可以计算的内容
 */
class Factor extends ASTNode {
  /**
   * 
   * @param {ASTNode} _parent
   * @param {PeekTokenIterator} it
   */
  constructor(_parent, it) {
    super(_parent)
    const token = it.next()
    const type = token.getType()

    if (type === TokenType.VARIABLE) {
      this.type = ASTNodeTypes.VARIABLE
    } else {
      this.type = ASTNodeTypes.SCALAR
    }

    this.label = token.getValue()
    this.lexeme = token
  }
}

module.exports = Factor