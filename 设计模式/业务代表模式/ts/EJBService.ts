import BusinessService from "./BusinessService";

export default class EJBService implements BusinessService {
  doProcessing(): void {
    console.log('Processing task by invoking EJB Service')
  }
}