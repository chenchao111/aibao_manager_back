import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

// 不重定向白名单 不需要进行拦截的路由地址(不需要权限 任何人都可以任意访问的路径，其他路径至少需要先登录才能访问)
const whiteList = [
  '/login'
]

/*
  @name -> 白名单
  @return Promise
*/
function authWhite(store, to, next) {
  return new Promise((resolve, reject) => {
    // 白名单 | 登陆验证(缓存验证)
    if (whiteList.indexOf(to.path) > -1 || store.getters.isLogin) { // 已经登录 或者 是白名单中的路由 直接返回成功
      return resolve()
    }
    reject()
    next({ path: '/login' })
  })
}

export default function permission(router) {
  router.beforeEach(async(to, from, next) => {
    NProgress.start()
    // 路由判断
    try {
      await authWhite(store, to, next)
      if (from.name === 'Merchant-add' && to.name !== 'Merchant-add') {
        console.log('非add路由    清空vuex')
        store.commit('CLEAR_MERCHANT_ID') // 路由跳转清空merchantId
      }
      next()
    } catch (err) {
      NProgress.done()
      console.warn(err)
    }
  })

  router.afterEach(() => {
    NProgress.done() // 结束Progress
  })
}
