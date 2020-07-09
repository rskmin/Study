import FilterManager from './FilterManager'

export default class Client {
  filterManager?: FilterManager

  setFilterManager(filterManager: FilterManager): void {
    this.filterManager = filterManager
  }

  sendRequest(request: string): void {
    this.filterManager?.filterRequest(request)
  }
}