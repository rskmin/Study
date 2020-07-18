import { AxiosRequestConfig, AxiosResponse } from './types'
import qs from 'qs'
import parseHeaders from 'parse-headers'

export default class Axios {
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest(config)
  }
  // 派发请求的方法
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
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
      if (headers) {
        for (let key in headers) {
          request.setRequestHeader(key, headers[key])
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