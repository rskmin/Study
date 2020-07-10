import ColdDrink from './ColdDrink'

// 扩展冷饮实体类 - 可口可乐
export default class Coke extends ColdDrink {
  price(): number {
    return 30.0
  }
  name(): string {
    return 'Coke'
  }
}
