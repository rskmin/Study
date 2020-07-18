import axios from './axios'
import { AxiosResponse, AxiosRequestConfig } from './axios/types'

const baseURL = 'http://localhost:8080'

// 指代服务器返回的对象
interface User {
  name: string
  password: string
}

let user: User = {
  name: 'rskmin',
  password: '123456'
}

console.time('cost')
// 请求拦截器先加的后执行
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers && (config.headers.name += '1')
  return config
}, (error: any): any => Promise.reject(error))
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers && (config.headers!.name += '2')
  return config
})
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers && (config.headers!.name += '3')
  return config
})
// 响应拦截先加的先执行
axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.name += '1'
  return response
})
axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.name += '2'
  return response
})
axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  response.data.name += '3'
  return response
})

axios<User>({
  method: 'post',
  url: baseURL + '/post',
  headers: {
    'content-type': 'application/json'
  },
  timeout: 1000,
  data: user
}).then((response: AxiosResponse<User>) => {
  console.log(response)
  return response.data
}).then((data: User) => {
  console.log(data)
}).catch((error: any) => {
  console.log(error)
})