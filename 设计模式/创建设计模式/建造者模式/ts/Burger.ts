import Item from './Item'
import Packing from './Packing';
import Wrapper from './Wrapper';

// 汉堡抽象类
export default abstract class Burger implements Item {
  packing(): Packing {
    return new Wrapper()
  }
  abstract name(): string
  abstract price(): number
}