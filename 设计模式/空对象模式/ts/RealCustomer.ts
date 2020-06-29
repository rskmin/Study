import AbstractCustomer from './AbstractCustomer'

export default class RealCustomer extends AbstractCustomer {
  constructor(name: string) {
    super()
    this.name = name
  }
  getName(): string | undefined {
    return this.name
  }
  isNil(): boolean {
    return false
  }
}
