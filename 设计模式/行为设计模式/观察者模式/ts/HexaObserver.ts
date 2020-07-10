import Observer from "./Observer";
import Subject from "./Subject";

/**
 * 十六进制实体观察者
 */
export default class HexaObserver extends Observer {
  constructor(subject: Subject) {
    super(subject)
    this.subject.attach(this)
  }
  update(): void {
    console.log(`Hex String: ${this.subject.getState()?.toString(16).toLocaleUpperCase()}`)
  }
}
