import Strategy from "./Strategy"

export default class Context {
  strategy: Strategy
  constructor(strategy: Strategy) {
    this.strategy = strategy
  }

  executeStrategy(num1: number, num2: number): number {
    return this.strategy.doOperation(num1, num2)
  }
}