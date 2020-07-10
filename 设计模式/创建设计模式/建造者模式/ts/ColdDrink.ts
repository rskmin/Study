import Item from './Item'
import Packing from './Packing'
import Bottle from './Bottle'

// 冷饮抽象类
export default abstract class ColdDrink implements Item {
  packing(): Packing {
    return new Bottle()
  }
  abstract name(): string
  abstract price(): number
}