const ASTNode = require('./ASTNode')

/**
 * 抽象语法树 - 表达式节点
 */
class Expr extends ASTNode {
  constructor(_parent) {
    super(_parent)
  }
}

module.exports = Expr