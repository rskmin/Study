import StudentView from './StudentView'
import HomeView from './HomeView'

// 请求转发器 - 转发到对应视图层
export default class Dispatcher {
  private _studentView: StudentView
  private _homeView: HomeView

  constructor() {
    this._studentView = new StudentView
    this._homeView = new HomeView()
  }

  dispatch(request: string): void {
    if (request.toLocaleUpperCase() === 'STUDENT') {
      this._studentView.show()
    } else {
      this._homeView.show()
    }
  }
}