import TerminalExpression from "./TerminalExpression";
import Expression from "./Expression";
import OrExpression from "./OrExpression";
import AndExpression from "./AndExpression";

function getMaleExpression(): Expression {
  const robert: Expression = new TerminalExpression('Robert')
  const john: Expression = new TerminalExpression('John')
  return new OrExpression(robert, john)
}

function getMarriedWomanExpression(): Expression {
  const julie: Expression = new TerminalExpression('Julie')
  const married: Expression = new TerminalExpression('Married')
  return new AndExpression(julie, married)
}

const isMale: Expression = getMaleExpression()
const isMarriedWoman: Expression = getMarriedWomanExpression()

console.log(`John is male? ${isMale.interpret('John')}`)
console.log(`Julie is a married women? ${isMarriedWoman.interpret('Married Julie')}`)