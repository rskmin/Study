import Expression from "./Expression";

export default class AndExpression implements Expression {
  private expr1: Expression
  private expr2: Expression

  constructor(expr1: Expression, expr2: Expression) {
    this.expr1 = expr1
    this.expr2 = expr2
  }

  /**
   * @override
   * @param {string} context 
   */
  interpret(context: string): boolean {
    return this.expr1.interpret(context) && this.expr2.interpret(context)
  }
  
}