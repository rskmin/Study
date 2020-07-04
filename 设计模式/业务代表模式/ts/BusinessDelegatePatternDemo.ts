import BusinessDelegate from './BusinessDelegate'
import Client from './Client'

const businessDelegate: BusinessDelegate = new BusinessDelegate()
businessDelegate.serviceType = 'EJB'

const client: Client = new Client(businessDelegate)
client.doTask()

businessDelegate.serviceType = 'JMS'
client.doTask()