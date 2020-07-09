import Filter from './Filter'

export default class DebugFilter implements Filter {
  execute(request: string): void {
    console.log(`request log: ${request}`)
  }
}