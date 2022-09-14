import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: constantRoutes
}
const mutations = {
  SET_ROUTES(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  filterRoutes(action, menu) {
    const routes = asyncRoutes.filter(outer => menu.some(inner => outer.name === inner))
    action.commit('SET_ROUTES', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
