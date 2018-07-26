const Layout = () => import('@/components/layout/Layout')

const routers = [
  {
    path: '/order',
    component: Layout,
    redirect: 'Order',
    children: [
      {
        path: 'index',
        name: 'Order',
        component: () => import('@/views/order/index/index'),
        meta: { title: '订单管理', icon: 'order' }
      },
      {
        path: '/detail',
        name: 'Order-detail',
        component: () => import('@/views/order/detail/index'),
        hidden: true,
        meta: { title: '订单详情' }
      }
    ]
  }
]

export default routers
