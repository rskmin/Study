import AbstractCustomer from "./AbstractCustomer";

export default class NullCustomer extends AbstractCustomer {
  getName() {
    return 'Not Available in Customer Database'
  }
  isNil() {
    return true
  }
}