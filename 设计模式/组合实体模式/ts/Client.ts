import CompositeEntity from './CompositeEntity'

// 使用组合实体地客户端类
export default class Client {
  private compositeEntity: CompositeEntity = new CompositeEntity()

  printData(): void {
    for (let i = 0; i < this.compositeEntity.getData().length; i++) {
      console.log(`Data: ${this.compositeEntity.getData()[i]}`)
    }
  }

  setData(data1: string, data2: string): void {
    this.compositeEntity.setData(data1, data2)
  }
}