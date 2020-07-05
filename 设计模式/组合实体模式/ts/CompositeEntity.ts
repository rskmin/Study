import CoarseGrainedObject from "./CoarseGrainedObject";

// 创建组合实体
export default class CompositeEntity {
  private cgo: CoarseGrainedObject = new CoarseGrainedObject()

  setData(data1: string, data2: string): void {
    this.cgo.setData(data1, data2)
  }

  getData(): Array<string> {
    return this.cgo.getData()
  }
}