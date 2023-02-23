import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // const resp = response.data
    // if (resp.code !== 1) {
    //   return Promise.reject(resp)
    // } else {
    //   return resp
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
