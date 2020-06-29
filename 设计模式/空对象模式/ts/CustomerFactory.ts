import AbstractCustomer from './AbstractCustomer'
import RealCustomer from './RealCustomer'
import NullCustomer from './NullCustomer'

export default class CustomerFactory {
  static names = [ 'Rob', 'Joe', 'Julie' ]
  static getCustomer(name: string): AbstractCustomer {
    const caseNames = this.names.map(item => item.toLocaleUpperCase())
    for (let i = 0, len = this.names.length; i < len; i++) {
      if (caseNames[i] === name.toLocaleUpperCase()) {
        return new RealCustomer(name)
      }
    }
    return new NullCustomer()
  }
}