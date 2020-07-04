import BusinessDelegate from './BusinessDelegate'

export default class Client {
  businessService: BusinessDelegate

  constructor(businessService: BusinessDelegate) {
    this.businessService = businessService
  }
  doTask(): void {
    this.businessService.doTask()
  }
}