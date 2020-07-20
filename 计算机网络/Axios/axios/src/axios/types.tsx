import AxiosInterceptorManger from './AxiosInterceptorManger'
type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'options' | 'OPTIONS'

export interface AxiosRequestConfig {
  url?: string
  method?: Methods
  params?: any
  headers?: Record<string, any>
  data?: any
  timeout?: number
  transformRequest?: (data: any, headers: any) => any
  transformResponse?: (data: any) => any
  cancelToken?: any
}

export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
  interceptors: {
    request: AxiosInterceptorManger<AxiosRequestConfig>
    response: AxiosInterceptorManger<AxiosResponse>
  }
  cancelToken: any
  isCancel: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers?: Record<string, any>
  config?: AxiosRequestConfig
  request?: XMLHttpRequest
}