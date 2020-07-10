import Strategy from "./Strategy";

export default class OperationMultiply implements Strategy {
  doOperation(num1: number, num2: number): number {
    return num1 * num2
  }
}
