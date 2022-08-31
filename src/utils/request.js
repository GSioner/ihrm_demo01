import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth.js'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
const TimeOut = 7200

service.interceptors.request.use(
  (request) => {
    if (store.getters.token) {
      (Date.now() - getTimeStamp()) / 1000 > TimeOut ? isTimeOut() : ''
      request.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    // ^ --- 解构数据
    const { success, message, data } = response.data
    // ^ --- 根据文档的success属性判断数据是否发送成功
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // ^ --- 输出错误报告
    if (error.response && error.response.data && error.response.data.code === 10002) {
      isTimeOut()
    }
    return Promise.reject('axios拦截器拦截报错', error.message)
  }
)

function isTimeOut() {
  store.dispatch('user/logoout')
  router.push('/login')
  Message.error('权限超时，请重新登录!')
  return Promise.reject(new Error('权限超时'))
}

export default service
