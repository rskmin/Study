
export default class SingleObject {
  // 创建 SingleObject 的一个对象
  private static instance: SingleObject = new SingleObject()

  // 设置构造函数为 private， 这样该类就不会被实例化
  private constructor() {}

  // 获取唯一可用的对象
  public static getInstance(): SingleObject {
    return this.instance
  }

  public showMessage() {
    console.log('Hello World!')
  }
}