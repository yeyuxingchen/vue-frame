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
    const resp = response.data
    if (resp.code !== 1) {
      if (resp.code === -1) {
        Message({
          message: '服务器走丢了，请稍后再试~',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(resp)
      }

      const msg = resp.msg || 'Error'
      if (msg !== 'Error') {
        Message({
          message: msg,
          type: 'warning',
          duration: 5 * 1000
        })
      }

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (resp.code < 0) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('logout').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(resp)
    } else {
      return resp
    }
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
