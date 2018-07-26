import Vue from 'vue'
import Router from 'vue-router'

import finalRouter from './finalRouter'
// 守护路由 进行路由判断
import permission from './permission'

Vue.use(Router)

const routerInit = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: finalRouter
})

// 路由守卫
permission(routerInit)

export default routerInit
