import Observer from "./Observer";
import Subject from "./Subject";

/**
 * 八进制实体观察者
 */
export default class OctalObserver extends Observer {
  constructor(subject: Subject) {
    super(subject)
    this.subject.attach(this)
  }
  update(): void {
    console.log(`Octal String: ${this.subject.getState()?.toString(8)}`)
  }
}