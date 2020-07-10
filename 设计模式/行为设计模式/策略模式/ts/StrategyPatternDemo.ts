import Context from "./Context";
import OperationAdd from "./OperationAdd";

let context = new Context(new OperationAdd())
console.log(`10 + 5 = ${context.executeStrategy(10,5)}`)

context = new Context(new OperationAdd())
console.log(`10 - 5 = ${context.executeStrategy(10,5)}`)

context = new Context(new OperationAdd())
console.log(`10 * 5 = ${context.executeStrategy(10,5)}`)