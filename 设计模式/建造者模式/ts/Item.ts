import Packing from './Packing'

// 表示食物条目的接口
export default interface Item {
  name(): string
  packing(): Packing
  price(): number
}
