import Filter from './Filter'
import Target from './Target'

export default class FilterChain {
  private _filters: Array<Filter> = []
  private _target?: Target

  addFilter(filter: Filter): void {
    this._filters.push(filter)
  }

  execute(request: string): void {
    for (let filter of this._filters) {
      filter.execute(request)
    }
    this._target?.execute(request)
  }

  setTarget(target: Target): void {
    this._target = target
  }
}