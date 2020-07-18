interface OnFulfilled<V> {
  (value: V): V | Promise<V>
}
interface OnRejected {
  (error: any): any
}

export interface Interceptor<V> {// 拦截器
  onFulfilled?: OnFulfilled<V> // 成功的回调
  onRejected?: OnRejected // 失败的回调
}

export default class AxiosInterceptorManger<V> {
  public interceptors: Array<Interceptor<V> | null> = []
  use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
    this.interceptors.push({
      onFulfilled,
      onRejected
    })
    return this.interceptors.length - 1
  }
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
