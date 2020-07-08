import Dispatcher from './Dispatcher'

// 前端控制器
export default class FrontController {
  private _dispatcher: Dispatcher

  constructor() {
    this._dispatcher = new Dispatcher()
  }

  /**
   * 用户身份验证
   * @return {boolean}
   */
  isAuthenticUser(): boolean {
    console.log('User is authenticated successfully.')
    return true
  }

  /**
   * 记录每一个请求
   * @param {string} request 
   */
  trackRequest(request: string): void {
    console.log(`Page requested: ${request}`)
  }

  dispatchRequest(request: string): void {
    this.trackRequest(request)
    if (this.isAuthenticUser()) {
      this._dispatcher.dispatch(request)
    }
  }
}