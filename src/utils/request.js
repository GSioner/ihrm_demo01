import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(
  (request) => {
    if (store.getters.token) {
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
    Message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default service
