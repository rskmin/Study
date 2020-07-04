import BusinessService from "./BusinessService";

export default class JMSService implements BusinessService {
  doProcessing(): void {
    console.log('Processing task by invoking JMS Service')
  }
}