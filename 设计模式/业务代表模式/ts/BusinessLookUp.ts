import EJBService from './EJBService'
import BusinessService from './BusinessService'
import JMSService from './JMSService'

export default class BusinessLookUp {
  getBusinessService(serviceType: string): BusinessService {
    if (serviceType === 'EJB') {
      return new EJBService()
    } else {
      return new JMSService()
    }
  }
}