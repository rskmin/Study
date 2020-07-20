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
const CancelToken = axios.cancelToken
const isCancel = axios.isCancel
const source = CancelToken.source()

axios({
  method: 'post',
  url: baseURL + '/post',
  headers: {
    common: {
      accept: 'application/json'
    }
  },
  cancelToken: source.token,
  timeout: 1000,
  data: user
}).then((response: AxiosResponse<User>) => {
  console.log(response)
  return response.data
}).then((data: User) => {
  console.log(data)
}).catch((error: any) => {
  if (isCancel(error)) {
    console.log('isCancel取消请求', error)
  } else {
    console.log(error)
  }
})
source.cancel('用户取消了请求')