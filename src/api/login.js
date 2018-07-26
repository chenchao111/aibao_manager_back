import request from '@/utils/request'

export function login(userInfo) {
  return request({
    url: '/login/loginByNameAndPwd',
    method: 'post',
    data: userInfo
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      username: 'admin',
      password: 'admin'
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
