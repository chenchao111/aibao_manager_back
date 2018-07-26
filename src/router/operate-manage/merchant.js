const Layout = () => import('@/components/layout/Layout')

const routers = [
  {
    path: '/merchant',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Merchant',
        component: () => import('@/views/merchant/index/index'),
        meta: { title: '商家管理', icon: 'merchant' }
      },
      {
        path: 'detail',
        name: 'Merchant-detail',
        component: () => import('@/views/merchant/detail/index'),
        hidden: true,
        meta: { title: '商家详情' }
      },
      {
        path: 'add',
        name: 'Merchant-add',
        component: () => import('@/views/merchant/add/index'),
        hidden: true,
        meta: { title: '添加商家' }
      },
      {
        path: 'upload',
        name: 'Merchant-upload',
        component: () => import('@/views/merchant/upload/index'),
        hidden: true,
        meta: { title: '批量导入商家信息' }
      }
    ]
  }
]

export default routers
