import Packing from './Packing'

// 包装瓶类
export default class Bottle implements Packing {
  pack(): string {
    return 'Bottle'
  }
}