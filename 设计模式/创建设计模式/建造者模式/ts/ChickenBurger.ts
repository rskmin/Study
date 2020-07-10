import Burger from './Burger'

// 扩展汉堡实体类 - 鸡肉汉堡
export default class ChickenBurger extends Burger {
  price(): number {
    return 50.5
  }
  name(): string {
    return 'Chicken Burger'
  }
}
