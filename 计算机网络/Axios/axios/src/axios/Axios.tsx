import { AxiosRequestConfig, AxiosResponse } from './types'
import AxiosInterceptorManger, { Interceptor } from './AxiosInterceptorManger'
import qs from 'qs'
import parseHeaders from 'parse-headers'
let defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {// 针对所有方法的请求生效
      accept: 'application/json'
    }
  }
}
let getStyleMethods = ['get', 'head', 'delete', 'options']// get风格的请求
getStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {}
})
let postStyleMethods = ['put', 'post', 'patch']// post风格的请求
postStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {
    'content-type': 'application/json'
  }
})
let allMethods = [...getStyleMethods, ...postStyleMethods]

export default class Axios<T> {
  public defaults: AxiosRequestConfig = defaults
  public interceptors = {
    request: new AxiosInterceptorManger<AxiosRequestConfig>(),
    response: new AxiosInterceptorManger<AxiosResponse<T>>()
  }
  request(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    config.headers = Object.assign(this.defaults.headers, config.headers)
    const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>> = [
      {
        onFulfilled: this.dispatchRequest,
        onRejected: (error: any)=> error
      }
    ]
    this.interceptors.request.interceptors.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
      // 向处理链左侧添加请求拦截处理
      interceptor && chain.unshift(interceptor)
    })

    this.interceptors.response.interceptors.forEach((interceptor: Interceptor<AxiosResponse<T>> | null) => {
      // 向处理链右侧添加响应拦截处理
      interceptor && chain.push(interceptor)
    })
    // 利用promise构成处理链
    let promise: any = Promise.resolve(config)
    while (chain.length) {
      const { onFulfilled, onRejected } = chain.shift()!
      promise = promise.then(onFulfilled, onRejected)
    }
    return promise
  }
  // 派发请求的方法
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>(function (resolve, reject) {
      let { method, url, params, headers, data, timeout } = config
      let request = new XMLHttpRequest()
      if (params) {
        params = qs.stringify(params)
        url += (url!.includes('?') ? '&' : '?') + params
      }
      request.open(method!, url!, true)
      request.responseType = 'json'
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 0) {
          if (request.status >= 200 && request.status < 300) {
            let response: AxiosResponse<T> = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config,
              request
            }
            resolve(response)
          } else {
            reject(`Error: Request failed with status code ${request.status}`)
          }
        }
      }
      // if (headers) {
      //   for (let key in headers) {
      //     request.setRequestHeader(key, headers[key])
      //   }
      // }
      if (headers) {
        for (let key in headers) {
          if (key === 'common' || key === config.method) {
            for (let key2 in headers[key]) {
              request.setRequestHeader(key2, headers[key][key2])
            }
          } else {
            request.setRequestHeader(key, headers[key])
          }
        }
      }
      let body: string | null = null
      if (data) {
        body = JSON.stringify(data)
      }
      request.onerror = function () {
        reject('net::ERR_INTERNET_DISCONNECTED')
      }
      if (timeout) {
        request.timeout = timeout
        request.ontimeout = function () {
          reject(`Error: timeout of ${timeout}ms exceeded`)
        }
      }
      request.send(body)
    })
  }
}