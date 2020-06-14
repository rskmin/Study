/**
 * 异常处理
 */
class LexicalException extends Error {

  constructor(msg) {
    super(msg)
  }

  /**
   * 通过模板字符初始化异常类(工厂模式)
   */
  static fromChar(c) {
    return new LexicalException(`Unexpected char ${c}`)
  }

}

module.exports = LexicalException