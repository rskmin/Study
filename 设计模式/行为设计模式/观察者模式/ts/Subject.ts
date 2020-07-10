import Observer from './Observer'
/**
 * 被观察者 - 同时具有管理观察者的功能
 */
export default class Subject {
  private observers: Array<Observer> = []
  private state?: number

  getState(): number {
    return this.state || 0
  }
  setState(state: number): void {
    this.state = state
    this.notifyAllObservers()
  }
  attach(observer: Observer): void {
    this.observers.push(observer)
  }
  notifyAllObservers(): void {
    for (const observer of this.observers) {
      observer.update()
    }
  }
}