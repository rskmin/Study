import Axios from './Axios'
import { AxiosInstance } from './types'

// 创建一个axios实例
function createInstance(): AxiosInstance {
  let context: Axios = new Axios()
  // 让 request 方法里的this永远指向 Axios 实例
  let instance = Axios.prototype.request.bind(context)
  // 把 Axios 的类的实例和类的原型上的方法都拷贝到了instance上，也就是request方法上
  instance = Object.assign(instance, Axios.prototype, context)
  return instance as AxiosInstance
}
let axios = createInstance()

export default axios