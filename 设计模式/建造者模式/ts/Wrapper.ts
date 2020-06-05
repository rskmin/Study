import Packing from './Packing'

// 包装纸类
export default class Wrapper implements Packing {
  pack(): string {
    return 'Wrapper'
  }
}