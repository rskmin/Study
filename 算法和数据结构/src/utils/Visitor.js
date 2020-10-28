/**
 * 访问器
 */
class Visitor {
  /**
   * @param {Function} handler - 处理者
   */
  constructor(handler = () => { }) {
    this.handler = handler;
  }
  /**
   * 访问方法
   * @param {*} value - 访问到的内容
   */
  visit(value) {
    this.handler(value);
  }
}

module.exports = Visitor;