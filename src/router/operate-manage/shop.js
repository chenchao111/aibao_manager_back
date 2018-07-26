const Layout = () => import('@/components/layout/Layout')

const routers = [
  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Shop',
        component: () => import('@/views/shop/index/index'),
        meta: { title: '商城管理', icon: 'shop' }
      },
      {
        path: 'detail',
        name: 'Shop-detail',
        component: () => import('@/views/shop/detail/index'),
        hidden: true,
        meta: { title: '商城详情' }
      }
    ]
  }
]

export default routers
