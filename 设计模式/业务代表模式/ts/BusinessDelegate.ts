import BusinessLookUp from './BusinessLookUp'
import BusinessService from './BusinessService'

export default class BusinessDelegate {
  private _lookupService: BusinessLookUp = new BusinessLookUp()
  private _businessService?: BusinessService
  private _serviceType?: string

  
  public set serviceType(newType : string) {
    this._serviceType = newType
  }

  doTask() {
    if (this._serviceType) {
      this._businessService = this._lookupService.getBusinessService(this._serviceType)
      this._businessService.doProcessing()
    } else {
      console.log('Please say your service type.')
    }
  }
  
}