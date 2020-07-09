import FilterChain from './FilterChain'
import Target from './Target'
import Filter from './Filter'

/**
 * 过滤管理器
 */
export default class FilterManager {
  filterChain: FilterChain

  constructor(target: Target) { 
    this.filterChain = new FilterChain()
    this.filterChain.setTarget(target)
  }

  setFilter(filter: Filter): void {
    this.filterChain.addFilter(filter)
  }

  filterRequest(request: string): void {
    this.filterChain.execute(request)
  }
}