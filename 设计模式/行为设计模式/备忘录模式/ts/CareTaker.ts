import Memento from "./Memento";

/**
 * 备忘本
 */
export default class CareTaker {
  private mementoList: Array<Memento> = []

  add(state: Memento): void {
    this.mementoList.push(state)
  }

  get(index: number): Memento {
    return this.mementoList[index]
  }
}