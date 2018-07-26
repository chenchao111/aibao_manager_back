// 登录相关路由
import routerLogin from './login'
// 运行管理相关路由
import operateManage from './operate-manage'

// const Layout = () => import('@/components/layout/Layout')

// 特殊的 / 和 * 路由
const routers = [
  { path: '/', name: '/', redirect: '/order/index' },
  // {
  //   path: '/home',
  //   component: Layout,
  //   name: 'Home',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/home/index'),
  //     meta: { title: '首页', icon: 'home' }
  //   }]
  // },
  { path: '*', component: () => import('@/views/404'), hidden: true }
]

// 最终的路由
const finalRouter = [].concat(routers, routerLogin, operateManage)

export default finalRouter
