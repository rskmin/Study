import AbstractCustomer from "./AbstractCustomer";

// 用空对象取代 null 做空值检查
export default class NullCustomer extends AbstractCustomer {
  getName() {
    return 'Not Available in Customer Database'
  }
  isNil() {
    return true
  }
}