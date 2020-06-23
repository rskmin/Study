import State from "./State";

export default class Context {
  private state: State | null

  constructor() {
    this.state = null
  }

  setState(state: State): void {
    this.state = state
  }

  getState(): State | null {
    return this.state
  }
}