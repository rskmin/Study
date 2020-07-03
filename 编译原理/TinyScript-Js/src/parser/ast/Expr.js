const ASTNode = require('./ASTNode')
const PeekTokenIterator = require('../util/PeekTokenIterator')
const ASTNode = require('./ASTNode')
const Token = require('../../lexer/Token')
const ASTNodeTypes = require('./ASTNodeTypes')
const PeekTokenIterator = require('../util/PeekTokenIterator')
const table = require('../util/PriorityTable')
const PeekTokenIterator = require('../util/PeekTokenIterator')
const PeekTokenIterator = require('../util/PeekTokenIterator')
const PeekIterator = require('../../common/PeekIterator')
const PeekTokenIterator = require('../util/PeekTokenIterator')
const PeekTokenIterator = require('../util/PeekTokenIterator')
const Variable = require('./Variable')
const Scalar = require('./Scalar')

/**
 * 抽象语法树 - 表达式节点
 */
class Expr extends ASTNode {
  constructor(_parent) {
    super(_parent)
  }

  /**
   * 本类工厂函数
   * @param {ASTNode} parent 
   * @param {*} type 
   * @param {Token} token 
   * @return {Expr}
   */
  fromToken(parent, type, token) {
    const expr = new Expr(parent)
    expr.label = token.getValue()
    expr.lexeme = token
    expr.type = type
    return expr
  }

  /**
   * left: E(k) -> E(k) op(k) E(k+1) | E(k+1)
   * right:
   *  E(k) -> E(k+1) E_(k)
   *    let e = new Expr(); e.left = E(k+1); e.right = E_(k).child(0)
   *  E_(k) -> op(k) E(k+1) E_(k) | ε
   *    race
   * 
   *  E(t) -> F(因子) E_(t) | U(一元表达式) E_(t)
   * 
   * @param {ASTNode} parent 
   * @param {PeekTokenIterator} it 
   */
  static parseExpr(parent, it) {
    return Expr.E(parent, it, 0)
  }

  /**
   * 解析表达式
   * @param {ASTNode} parent 
   * @param {PeekTokenIterator} it 
   * @param {number} k 
   */
  static E(parent, it, k) {
    if (k < table.length - 1) {
      return Expr.combine(
        parent,
        it,
        () => Expr.E(parent, it, k + 1),
        () => Expr.E_(parent, it, k)
      )
    } else {
      return Expr.race(
        it,
        () => Expr.combine(
          parent,
          it,
          () => Expr.F(parent, it),
          () => Expr.E_(parent, it, k)
        ),
        () => Expr.combine(
          parent,
          it,
          () => Expr.U(parent, it),
          () => Expr.E_(parent, it, k)
        )
      )
    }
  }

  /**
   * 解析多带一个符号的表达式
   * @param {ASTNode} parent 
   * @param {PeekTokenIterator} it 
   * @param {number} k 
   */
  static E_(parent, it, k) {
    const token = it.peek()
    const value = token.getValue()

    if (table[k].includes(value)) {
      it.nextMatchValue(value)
      const expr = Expr.fromToken(parent, ASTNodeTypes.BINARY_EXPR, token)
      expr.addChild(
        combine(
          parent,
          it,
          () => Expr.E(parent, k + 1, it),
          () => Expr.E_(parent, k, it)
        )
      )
      return expr
    }
    return null
  }

  /**
   * 解析一元表达式
   * @param {ASTNode} parent 
   * @param {PeekTokenIterator} it 
   */
  static U(parent, it) {
    const token = it.peek()
    const value = token.getValue()

    if (value === '(') {
      it.nextMatchValue('(')
      const expr = Expr.parseExpr(parent, it)
      it.nextMatchValue(')')
      return expr
    } else if (value === '++' || value === '--' || value === '!') {
      const t = it.peek()
      it.nextMatchValue(value)
      const expr = new Expr.fromToken(parent, ASTNodeTypes.UNARY_EXPR, t)
      expr.addChild(Expr.parseExpr(parent, it))
      return expr
    }
    return null
  }

  /**
   * 解析因子
   * @param {ASTNode} parent 
   * @param {PeekTokenIterator} it 
   */
  static F(parent, it) {
    const token = it.peek()
    if (token.isVariable()) {
      return new Variable(parent, it)
    } else {
      return new Scalar(parent, it)
    }
  }

  /**
   * 回调函数
   * 
   * @callback funcA
   * @return {ASTNode}
   * @callback funcB
   * @return {ASTNode}
   */

  /**
   * 合并 E() 和 E_() 生成的树
   * @param {ASTNode} parent 
   * @param {PeekTokenIterator} it 
   * @param {funcA} funcA 
   * @param {funcB} funcB 
   */
  static combine(parent, it, funcA, funcB) {
    if (!it.hasNext()) {// 流中无数据
      return null
    }

    const a = funcA()
    if (a == null) {
      return it.hasNext() ? funcB() : null
    }
    const b = it.hasNext() ? funcB() : null
    if (b == null) {
      return a
    }

    const expr = Expr.fromToken(parent, ASTNodeTypes.BINARY_EXPR, b.lexeme)
    expr.addChild(a)
    expr.addChild(b.getChild(0))
    return expr

  }

  /**
   * 
   * @param {ASTNode} parent 
   * @param {PeekTokenIterator} it 
   * @param {funcA} funcA 
   * @param {funcB} funcB 
   */
  static race(it, funcA, funcB) {
    if (!it.hasNext()) {// 流中无数据
      return null
    }
    const a = funcA()
    if (a == null) {
      return funcB()
    }
    return a
  }
}

module.exports = Expr