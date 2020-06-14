const TokenType = require('./TokenType')
const AlphabetHelper = require('./AlphabetHelper')
const LexicalException = require('./LexicalException')

const Keywords = new Set([
  'var',
  'if',
  'else',
  'for',
  'while',
  'break',
  'func',
  'return'
])

class Token {
  constructor(type, value) {
    this._type = type
    this._value = value
  }

  getType() {
    return this._type
  }
  getValue() {
    return this._value
  }

  /**
   * 是否是变量
   * @return {boolean}
   */
  isVariable() {
    return this._type === TokenType.VARIABLE
  }

  /**
   * 是否是值类型
   * @return {boolean}
   */
  isScalar() {
    return this._type === TokenType.INTEGER ||
      this._type === TokenType.FLOAT ||
      this._type === TokenType.STRING ||
      this._type === TokenType.BOOLEAN
  }

  /**
   * 是否是数值或者变量类型
   * @return {boolean}
   */
  isValue() {
    return this.isScalar() || this.isVariable()
  }

  /**
   * 是否是类型标记
   * @return {boolean}
   */
  isType() {
    return (
      this._value === 'bool' ||
      this._value === 'int' ||
      this._value === 'float' ||
      this._value === 'void' ||
      this._value === 'string'
    )
  }

  /**
   * @return {string}
   */
  toString() {
    return `type ${this._type.type}, value ${this._value}`
  }

  /**
   * [工厂方法]
   * 提取变量或关键词
   * 保证进入方法时符合要求
   * @return {Token}
   */
  static makeVarOrKeyword(it) {
    let s = ''

    while (it.hasNext()) {
      const c = it.peek()

      if (AlphabetHelper.isLiteral(c)) {
        s += c
      } else {
        break
      }
      // 不变式
      it.next()
    }

    if (Keywords.has(s)) {
      return new Token(TokenType.KEYWORD, s)
    }

    if (s === 'true' || s == 'false') {
      return new Token(TokenType.BOOLEAN, s)
    }

    return new Token(TokenType.VARIABLE, s)

  }

  /**
   * [工厂方法]
   * 提取字符串
   * 保证进入方法时符合要求
   * @return {Token}
   */
  static makeString(it) {
    let s = ''
    let state = 0

    while (it.hasNext()) {
      let c = it.next()

      switch (state) {
        case 0:
          if (c === '\"') {
            state = 1
          } else {
            state = 2
          }
          s += c
          break
        case 1:
          if (c == '\"') {
            return new Token(TokenType.STRING, s + c)
          } else {
            s += c
          }
          break
        case 2:
          if (c == '\'') {
            return new Token(TokenType.STRING, s + c)
          } else {
            s += c
          }
          break

      }
    }
    // 程序错误 | 状态未关闭
    throw new LexicalException("Unexpected error")

  }

  /**
   * [工厂方法]
   * 提取操作符
   * 保证进入方法时符合要求
   * @return {Token}
   */
  static makeOp(it) {
    let state = 0
    while (it.hasNext()) {
      const lookahead = it.next()

      switch (state) {
        case 0:
          switch (lookahead) {
            case '+':
              state = 1
              break
            case '-':
              state = 2
              break
            case '*':
              state = 3
              break
            case '/':
              state = 4
              break
            case '>':
              state = 5
              break
            case '<':
              state = 6
              break
            case '=':
              state = 7
              break
            case '!':
              state = 8
              break
            case '&':
              state = 9
              break
            case '|':
              state = 10
              break
            case '^':
              state = 11
              break
            case '%':
              state = 12
              break
            case ',':
              return new Token(TokenType.OPERATOR, ",")
            case '':
              return new Token(TokenType.OPERATOR, "")
          }
          break
        case 1:
          if (lookahead === '+') {
            return new Token(TokenType.OPERATOR, "++")
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "+=")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "+")
          }
        case 2:
          if (lookahead === '-') {
            return new Token(TokenType.OPERATOR, "--")
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "-=")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "-")
          }
        case 3:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "*=")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "*")
          }
        case 4:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "/=")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "/")
          }
        case 5:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, ">=")
          } else if (lookahead === '>') {
            return new Token(TokenType.OPERATOR, ">>")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, ">")
          }
        case 6:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "<=")
          } else if (lookahead === '<') {
            return new Token(TokenType.OPERATOR, "<<")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "<")
          }
        case 7:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "==")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "=")
          }
        case 8:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "!=")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "!")
          }
        case 9:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "&=")
          } else if (lookahead === '&') {
            return new Token(TokenType.OPERATOR, "&&")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "&")
          }
        case 10:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "|=")
          } else if (lookahead === '|') {
            return new Token(TokenType.OPERATOR, "||")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "|")
          }
        case 11:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "^=")
          } else if (lookahead === '^') {
            return new Token(TokenType.OPERATOR, "^^")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "^")
          }
        case 12:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, "%=")
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, "%")
          }
      }
    }// end while

    // 程序错误 | 状态未关闭
    throw new LexicalException("Unexpected error")
  }

  /**
   * [工厂方法]
   * 提取数值
   * 保证进入方法时符合要求
   * @return {Token}
   */
  static makeNumber(it) {
    let s = ''
    let state = 0

    while (it.hasNext()) {
      const lookahead = it.peek()
      switch (state) {
        case 0:
          if (lookahead === '0') {
            state = 1
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '+' || lookahead === '-') {
            state = 3
          } else if (lookahead === '.') {
            state = 5
          }
          break
        case 1:
          if (lookahead === '0') {
            state = 1
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 4
          } else {
            return new Token(TokenType.INTEGER, s)
          }
          break
        case 2:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 4
          } else {
            return new Token(TokenType.INTEGER, s)
          }
          break
        case 3:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 5
          } else {
            throw LexicalException.formChar(lookahead)
          }
          break
        case 4:
          if (lookahead === '.') {
            throw LexicalException.formChar(lookahead)
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else {
            return new Token(TokenType.FLOAT, s)
          }
          break
        case 5:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else {
            throw LexicalException.formChar(lookahead)
          }
          break
        case 20:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else if (lookahead === '.') {
            throw LexicalException.formChar(lookahead)
          } else {
            return new Token(TokenType.FLOAT, s)
          }
          break
      }// end switch
      it.next()
      s += lookahead

    }// end while

    // 程序错误 | 状态未关闭
    throw new LexicalException("Unexpected error")
  }

}

module.exports = Token