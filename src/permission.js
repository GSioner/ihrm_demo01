import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const wihteList = ['/login', '/import', '/404']
// ^ --- next勾子参数，next() => 放行；next(false) => 终止放行；next(地址) => 跳转其他地址
router.beforeEach(async(to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  Nprogress.set(0.0)
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      } else {
        next()
      }
    }
    Nprogress.set(1.0)
  } else {
    wihteList.includes(to.path) ? next() : next('/login')
    Nprogress.set(1.0)
  }
})
