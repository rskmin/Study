const PeekIterator = require('../../common/PeekIterator')
const ParseException = require('./ParseException')

/**
 * Token流视察器
 */
class PeekTokenIterator extends PeekIterator {
  /**
   * 
   * @param {Iterator} it
   */
  constructor(it) {
    super(it)
  }

  /**
   * 检查下一个流中的符号是不是匹配一个值，并取出下一个符号
   * @param {string} value 
   * @return {Token}
   * @throws {ParseException}
   */
  nextMatchValue(value) {
    const token = this.next()
    if (token.getValue() !== value) {
      throw ParseException.fromToken(token)
    }
    return token
  }

  /**
   * 检查下一个流中的符号是不是匹配一个类型，并取出下一个符号
   * @param {string} type 
   * @return {Token}
   * @throws {ParseException}
   */
  nextMatchType(type) {
    const token = this.next()
    if (token.getType() !== type) {
      throw ParseException.fromToken(token)
    }
    return token
  }
}

module.exports = PeekTokenIterator