const TokenType = require('./TokenType')

class Token {
  constructor(type, value) {
    this._type = type
    this._value = value
  }

  getType() {
    return this._type
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
   * @return {string}
   */
  toString() {
    return `type ${this._type.type}, value ${this._value}`
  }

}

module.exports = Token