import { login, getInfo, getStaffInfo } from '@/api/user.js'
import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth.js'

export default {
  namespaced: true,
  state: {
    userToken: getToken() || null,
    userInfo: {}
  },
  mutations: {
    // * --- 保存用户token至本地
    GET_USER_TOKEN(state, data) {
      state.userToken = data
      setToken(data)
    },
    // * --- 移除用户权限
    REMOVE_USER_TOKEN(state) {
      state.userToken = null
      removeToken()
    },
    // ^ --- 添加用户信息
    GET_USER_INFOMATION(state, data) {
      state.userInfo = data
    },
    // ^ --- 移除用户信息
    REMOVE_USER_INFAMATION(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // * --- 获取用户token
    async getUserToken(action, data) {
      const res = await login(data)
      action.commit('GET_USER_TOKEN', res)
      setTimeStamp(+new Date())
    },
    // ^ --- 获取用户信息/以及相应的员工信息
    async getUserInfo(action) {
      const res = await getInfo()
      const baseInfo = await getStaffInfo(res.userId)
      const baseRes = { ...res, ...baseInfo }
      action.commit('GET_USER_INFOMATION', baseRes)
      return baseRes
    },
    // TODO --- 用户登出，清除用户信息以及用户token
    logoout(action) {
      action.commit('REMOVE_USER_TOKEN')
      action.commit('REMOVE_USER_INFAMATION')
    }
  }
}
