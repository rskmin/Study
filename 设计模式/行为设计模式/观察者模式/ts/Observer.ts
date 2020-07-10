import Subject from "./Subject";

/**
 * 观察者抽象类
 */
export default abstract class Observer {
  protected subject: Subject
  abstract update(): void
  constructor(subject: Subject) {
    this.subject = subject
  }
}