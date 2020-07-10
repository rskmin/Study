import Burger from './Burger'

// 扩展汉堡实体类 - 蔬菜汉堡
export default class VegBurger extends Burger {
  price(): number {
    return 25.0
  }
  name(): string {
    return 'Veg Burger'
  }
}
