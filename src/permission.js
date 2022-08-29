import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const wihteList = ['/login']
const timeout = 5400000
// ^ --- next勾子参数，next() => 放行；next(false) => 终止放行；next(地址) => 跳转其他地址
router.beforeEach(async(to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  Nprogress.set(0.0)
  if (store.getters.token) {
    if (+new Date() - store.getters.userTime > timeout) {
      console.log('+new Date() - store.getters.userTime > timeout: ', +new Date() - store.getters.userTime > timeout)
      router.push('/login')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
    Nprogress.set(1.0)
  } else {
    wihteList.includes(to.path) ? next() : next('/login')
    Nprogress.set(1.0)
  }
})
