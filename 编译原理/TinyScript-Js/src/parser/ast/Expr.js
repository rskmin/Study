const ASTNode = require('./ASTNode')
const PeekTokenIterator = require('../util/PeekTokenIterator')

/**
 * 抽象语法树 - 表达式节点
 */
class Expr extends ASTNode {
  constructor(_parent) {
    super(_parent)
  }

  /**
   * left: E(k) -> E(k) op(k) E(k+1) | E(k+1)
   * right:
   *  E(k) -> E(k+1) E_(k)
   *    let e = new Expr(); e.left = E(k+1); e.right = E_(k).child(0)
   *  E_(k) -> op(k) E(k+1) E_(k) | ε
   *    race
   * 
   * @param {ASTNode} parent 
   * @param {PeekTokenIterator} it 
   */
  static parseExpr(parent, it) {

  }

  static E(k) {}

  static E_(k) {}

  static combine() {}

  static race() {}
}

module.exports = Expr