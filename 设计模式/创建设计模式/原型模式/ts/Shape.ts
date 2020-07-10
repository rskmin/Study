export default abstract class Shape {
  private id: string = ''
  protected type: string = ''

  abstract draw(): void

  getType(): string {
    return this.type
  }

  getId(): string {
    return this.id
  }

  setId(id: string): void {
    this.id = id
  }

  clone(): Shape {
    // 将当前对象作为新对象的原型返回
    let clone: Shape = Object.create(this)
    return clone
  }
}