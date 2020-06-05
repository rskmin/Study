import ColdDrink from './ColdDrink'

// 扩展冷饮实体类 - 百事可乐
export default class Pepsi extends ColdDrink {
  price(): number {
    return 35.0
  }
  name(): string {
    return 'Pepsi'
  }
}
