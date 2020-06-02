const TokenType = require('./lexer/TokenType')
class Token {
  constructor(type, value) {
    this._type = type
    this._value = value
  }

  getType() {
    return this._type
  }

  isVariable() {
    return this._type === TokenType.VARIABLE
  }

  isSCalar() {
    return this._type === TokenType.INTEGER ||
        this._type === TokenType.FLOAT ||
        this._type === TokenType.STRING ||
        this._type === TokenType.BOOLEAN
  }

  toStirng() {
    return `type ${this._type.type}, value ${this.value}`
  }
}

module.exports = Token
