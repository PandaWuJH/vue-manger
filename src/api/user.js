import axios from '@/utils/axios.js'
// 登录请求
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 获取用户信息请求
export const getUsers = (params) => {
  return axios({
    url: '/users',
    method: 'get',
    params
  })
}

// 添加用户
export const addUsertosql = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}
