import Observer from "./Observer";
import Subject from "./Subject";

/**
 * 实体二进制观察者
 */
export default class BinaryObserver extends Observer {
  constructor(subject: Subject) {
    super(subject)
    // 向观察者管理类中加入自己
    this.subject.attach(this)
  }
  update(): void {
    console.log(`Binary String: ${this.subject.getState()?.toString(2)}`)
  }
}