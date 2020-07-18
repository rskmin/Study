import AxiosInterceptorManger from './AxiosInterceptorManger'
type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'options' | 'OPTIONS'

export interface AxiosRequestConfig {
  url?: string
  method?: Methods
  params?: any
  headers?: Record<string, any>
  data?: any
  timeout?: number
}

export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
  interceptors: {
    request: AxiosInterceptorManger<AxiosRequestConfig>
    response: AxiosInterceptorManger<AxiosResponse>
  }
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers?: Record<string, any>
  config?: AxiosRequestConfig
  request?: XMLHttpRequest
}