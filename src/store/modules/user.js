import { login } from '@/api/user.js'
import { setToken, getToken, removeToken } from '@/utils/auth.js'

export default {
  namespaced: true,
  state: {
    userToken: getToken() || null
  },
  mutations: {
    GET_USER_TOKEN(state, data) {
      state.userToken = data
      setToken(data)
    },
    REMOVE_USER_TOKEN(state) {
      state.userToken = null
      removeToken()
    }
  },
  actions: {
    async getUserToken(action, data) {
      const res = await login(data)
      action.commit('GET_USER_TOKEN', res)
    }
  }
}
