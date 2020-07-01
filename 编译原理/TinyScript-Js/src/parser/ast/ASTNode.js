const Token = require('../../lexer/Token')

/**
 * 抽象语法树抽象节点
 */
class ASTNode {
  constructor(_parent, _type = null, _label = null) {
    /* 父子节点 */
    this.children = []
    this.parent = _parent

    /* 关键信息 */
    this.lexeme = null// 词法单元
    this.label = _label// 备注
    this.type = _type// 类型
  }

  /**
   * 获取单个子节点信息
   * @param {number} index 
   * @return {ASTNode}
   */
  getChild(index) {
    return this.children[index]
  }

  /**
   * 添加子节点
   * @param {ASTNode} node 
   */
  addChild(node) {
    this.children.push(node)
  }

  /**
   * 获取词法单元
   * @return {Token}
   */
  getLexeme() {
    return this.lexeme
  }

  /**
   * 设置词法单元
   * @param {Token} token 
   */
  setLexeme(token) {
    this.lexeme = token
  }

  /**
   * 获取子节点数组
   * @return {Array<ASTNode>}
   */
  getChildren() {
    return this.children
  }

  /**
   * 设置抽象节点标签
   * @param {string} label 
   */
  setLabel(label) {
    this.label = label
  }

  /**
   * 设置抽象节点类型
   * @param {*} type 
   */
  setType(type) {
    this.type = type
  }

  /**
   * 以当前节点为根节点打印抽象语法树
   * @param {number} indent 
   */
  print(indent = 0) {
    console.log(`${''.padStart(indent * 2, ' ')}${this.label}`)
    this.children.forEach(x => x.print(indent + 1))
  }
}

module.exports = ASTNode