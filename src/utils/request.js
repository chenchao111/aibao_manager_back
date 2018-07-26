import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import qs from 'qs'
import { getToken } from '@/utils/auth'
import router from '@/router'

import { verifivationUrl } from '@/common/verificationUrl'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
  // 默认等待请求头格式
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  // 请求参数
  params: {
    _appid: 'optimus.m'
  },
  responseType: 'json',
  // 对发送请求前的请求头进行配置
  transformRequest: [function(data, headers) {
    const ct = headers['Content-Type']
    // json 类型
    if (ct && ct.indexOf('application/json') > -1) {
      return JSON.stringify(data)
    }
    // FormData 类型，ie10 +
    if (ct && ct.indexOf('multipart/form-data') > -1) {
      return data
    }
    // Do whatever you want to transform the data
    return qs.stringify(data)
  }]
})
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  verifivationUrl(config)
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  async response => {
  /**
  * code为非0是抛错 可结合自己业务进行修改
  */
    const res = response.data
    // 成功（1.http状态码为200 2.res的code为0） ==> 需要前后台定制好code成功值
    if (res.returncode === 0) {
      return Promise.resolve(res.result)
    }
    // 失败(1. http状态码为200 2.res的code非0)
    if ([508, 512, 514].indexOf(res.returncode) > -1) {
      try {
        await store.dispatch('ClearLogin')
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        })
        router.push({ path: '/login' })
      } catch (error) {
        console.warn(error)
      }
    } else {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(res)
  },
  // 失败 http状态码非200
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
