import request from '@/utils/request'

// 1. 初始化数据接口(搜索区域)
export function queryMechantBelongList() { // 商家管理===>归属
  return request({
    url: '/cwenterprise/getBelongList',
    method: 'post'
  })
}

// 2. 搜索接口(进行页面table数据初始化，点击指定页跳转进行数据获取，点击搜索根据搜索信息进行数据获取) 返回总条数、保费、佣金、总页数
export function queryMechantInfoList(query) { // 商家管理===>归属
  return request({
    url: '/cwenterprise/getCwEntListByCondition',
    method: 'post',
    data: query
  })
}

// 3. 详情接口，点击详情按钮进行数据获取和页面跳转(a. 商家信息 b. 支付信息 c. 服务与费用信息 d. 汽车维修 e. 汽车保养)
export function queryMechantDetailInfo(query) {
  return request({
    url: '/cwenterprise/getCwEntDetailById',
    method: 'post',
    data: query
  })
}
export function queryMechantPayInfo(query) {
  return request({
    url: '/cwenterprise/getCwEntPayInfoByEntId',
    method: 'post',
    data: query
  })
}
export function queryMechantServiceInfo(query) {
  return request({
    url: '/cwenterprise/getCwEntProdListByEntId',
    method: 'post',
    data: query
  })
}

// 4. 修改接口，进入详情页后点击修改按钮可以进行当前页面信息修改(a. 商家信息 b. 支付信息 c. 服务与费用信息 d. 汽车维修 e. 汽车保养)

// 5.1 停用接口，点击停用按钮进行商家停用操作(页面如何体现停用的商家???? 停用+启用进行切换???)
// 5.2 启用接口???对应停用接口
// 6. 商家删除接口
export function pushMechantStopAndStartUseInfo(query) {
  return request({
    url: '/cwenterprise/updateCwEntById',
    method: 'post',
    data: query
  })
}

// 6. 新增接口（a. 商家信息 b. 支付信息 c. 服务与费用信息 d. 汽车维修 e. 汽车保养）
export function pushMechantInfo(query) { // 商家
  return request({
    url: '/cwenterprise/addCwEnterprise',
    method: 'post',
    data: query
  })
}
export function pushMechantPayInfo(query) { // 支付
  return request({
    url: '/cwenterprise/addCwEntPayInfoAndVer',
    method: 'post',
    data: query
  })
}
export function pushMechantServiceInfo(query) { // 服务
  return request({
    url: '/cwenterprise/addCwEntProductList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: query
  })
}

// 7. 商家信息页面支持门店图片 上传、删除(修改: 删除+上传) ==> 添加、修改操作需要支持的操作

// 8. 批量导入文件信息获取，数据传递后台(数据筛查后台处理)

// 9. 省市县三级联动
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
    params: {
      provinceId
    }
  })
}
export function queryAllDistricts(cityId) { // 服务
  return request({
    url: '/region/getListByCityId',
    method: 'get',
    params: {
      cityId
    }
  })
}

// 10. 更新接口
export function updateMechantInfo(query) { // 商家
  return request({
    url: '/cwenterprise/updateCwEntById',
    method: 'post',
    data: query
  })
}
export function updateMechantPayInfo(query) { // 支付
  return request({
    url: '/cwenterprise/updatePayInfoByEntId',
    method: 'post',
    data: query
  })
}
export function updateMechantServiceInfo(query) { // 服务
  return request({
    url: '/cwenterprise/updateProductListByProdId',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: query
  })
}

// 注意：详情，修改，新增都是在进入到指定页面后才进行数据请求、修改、新增操作，不要一次性加载
