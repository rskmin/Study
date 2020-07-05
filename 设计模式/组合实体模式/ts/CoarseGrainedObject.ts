import DependentObject1 from "./DependentObject1";
import DependentObject2 from "./DependentObject2";

// 粗粒度对象
export default class CoarseGrainedObject {
  do1: DependentObject1 = new DependentObject1()
  do2: DependentObject2 = new DependentObject2()

  setData(data1: string, data2: string): void {
    this.do1.data = data1
    this.do2.data = data2
  }

  getData(): Array<string> {
    return [this.do1.data, this.do2.data]
  }
}