import request from '@/utils/request'
// 1. 初始化数据接口(搜索区域)

// 2. 搜索接口(进行页面table数据初始化，点击页面跳转进行数据获取，点击搜索根据搜索信息进行数据获取) 返回总条数、保费、佣金、总页数

export function queryShopList(query) { // 服务
  return request({
    url: '/goods/getGoodsCountVoList',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: query
  })
}

// 删除商品
export function removeGoods(query) {
  return request({
    url: '/goods/deleteGoods',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: query
  })
}

// 3. 详情接口，点击详情按钮进行数据获取和页面跳转
export function queryShopDetail(query) { // 服务
  return request({
    url: '/goods/getGoodsAndExtList',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: query
  })
}

// 4. 省市二级联动
export function queryAllProvinces(query) { // 服务
  return request({
    url: '/region/getAllProvince',
    method: 'get'
  })
}
export function queryAllCitys(provinceId) { // 服务
  return request({
    url: '/region/getAllCityByProvinceId',
    method: 'get',
    params: provinceId
  })
}

// 5. 保存主商品的修改
export function changeMainFoods(data) { // 服务
  return request({
    url: '/goods/updateGoods',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  })
}

// 6. 删除子商品
export function deleteGoodsExt(data) {
  return request({
    url: '/goods/deleteGoodsExt',
    method: 'get',
    params: data
  })
}

// 7. 批量添加或更新子商品信息
export function changeChildFoods(data) {
  return request({
    url: '/goods/updateOrInsertGoodsExt',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  })
}

// 8. 添加主商品
export function addGoods(data) {
  return request({
    url: '/goods/addGoods',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  })
}

// 8. 添加子商品
export function addGoodsExt(data) {
  return request({
    url: '/goods/updateOrInsertGoodsExt',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  })
}
