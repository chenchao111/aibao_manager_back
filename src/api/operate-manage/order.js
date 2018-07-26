import request from '@/utils/request'
// 1. 初始化数据接口(搜索区域)

// 2. 搜索接口(进行页面table数据初始化，点击页面跳转进行数据获取，点击搜索根据搜索信息进行数据获取) 返回总条数、保费、佣金、总页数

export function queryOrderList(query) { // 服务
  return request({
    url: '/order/getOrderList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: query
  })
}

// 3. 详情接口，点击详情按钮进行数据获取和页面跳转
export function queryOrderDetail(query) { // 服务
  return request({
    url: '/order/getGoodsOrderDetails',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: query
  })
}
export function queryUnOrderDetail(query) { // 服务
  return request({
    url: '/order/getNotGoodsOrderDetails',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: query
  })
}

// 4. 数据导出excel接口(全部??? 当前页???)

// 5. 删除接口，点击删除按钮删除指定订单信息(需要重新获取当前页信息还是直接在当前页删除该条信息????)
export function removeOrderInfo(query) { // 服务
  return request({
    url: '/order/deleteOrderById',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: query
  })
}
