import Expression from "./Expression";

export default class TerminalExpression implements Expression {
  private data: string

  constructor(data: string) {
    this.data = data
  }

  /**
   * @override
   * @param {string} context
   */
  interpret(context: string): boolean {
    if (context.indexOf(this.data) >= 0) {
      return true
    }
    return false
  }
}