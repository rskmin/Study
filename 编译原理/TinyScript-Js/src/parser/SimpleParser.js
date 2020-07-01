const PeekTokenIterator = require('./util/PeekTokenIterator')
const Expr = require('./ast/Expr')
const Scalar = require('./ast/Scalar')
const ASTNodeTypes = require('./ast/ASTNodeTypes')

class SimpleParser {

  // Expr -> digit + Expr | digit
  // digit -> 0|1|2|3|...|9
  /**
   * 语法分析
   * @param {PeekTokenIterator} it 
   */
  static parse(it) {

    const expr = new Expr(null)
    const scalar = new Scalar(expr, it)
    if (!it.hasNext()) {
      return scalar
    }

    expr.addChild(scalar)
    expr.setLexeme(it.peek())
    it.nextMatchValue('+')
    expr.setLabel('+')
    expr.setType(ASTNodeTypes.BINARY_EXPR)
    const rightNode = this.parse(it)
    expr.addChild(rightNode)
    return expr

  }
}

module.exports = SimpleParser