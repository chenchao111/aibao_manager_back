const routers = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]
export default routers
