import { login, getInfo } from '@/api/login'
import Storage from '@/utils/storage'
// import request from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'

const lStorage = new Storage('localStorage')
const user = {
  state: {
    // token值 (先把cookie中token获取进行初始化)
    token: getToken(),
    // 登录的用户信息 保存到localStorage
    userinfo: lStorage.getItem('userinfo')
  },

  getters: {
    isLogin(state) { // 是否登录
      console.log(11111)
      console.log(state.token)
      console.log(22222)
      if (state.userinfo && state.token) {
        return true
      } else {
        return false
      }
      // return !!state.userinfo
    }
  },

  mutations: {
    SET_USERINFO(state, data) {
      state.userinfo = data
      lStorage.setItem('userinfo', data)
    },
    CLEAR_USERINFO(state) {
      state.userinfo = false
      lStorage.removeItem('userinfo')
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },

  actions: {
    // 登录
    Login({ commit, dispatch }, userInfo) {
      return new Promise(async(resolve, reject) => {
        try {
          var res = await login(userInfo)
          setToken(res.accessToken)
          commit('SET_TOKEN', res.accessToken)
          commit('SET_USERINFO', res.userName)
          // await dispatch('GetUserInfo')
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise(async(resolve, reject) => {
        try {
          const userInfoData = await getInfo()
          const data = userInfoData.data
          if (Object.keys(data).length > 0) {
            commit('SET_USERINFO', data)
            resolve()
          } else {
            reject('Error: 获取 userinfo 信息失败')
          }
        } catch (err) {
          reject(err)
        }
      })
    },
    // 登出
    Logout({ commit, dispatch }) {
      return new Promise(async(resolve, reject) => {
        try {
          // await request(logout())
          dispatch('ClearLogin')
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
    ClearLogin({ commit }) {
      commit('CLEAR_USERINFO')
      commit('SET_TOKEN', '')
      removeToken()
    }
  }
}

export default user
