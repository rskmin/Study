import axios from './axios'
import { AxiosResponse } from './axios/types'

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

axios({
  method: 'post',
  url: baseURL + '/post_timeout?timeout=2000',
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