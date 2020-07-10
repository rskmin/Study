import Memento from "./Memento"

export default class Originator {
  private state: string = ''

  setState(state: string): void {
    this.state = state
  }
  getState(): string {
    return  this.state
  }

  saveStateToMemento(): Memento {
    return new Memento(this.state)
  }

  getStateFromMemento(Memento: Memento): void {
    this.state = Memento.getState()
  }
}