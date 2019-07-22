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

// 根据id获取用户信息
// export const getUserById = (row) => {
//   return axios({
//     url: `users/${row.id}`
//   })
// }

// 编辑用户
export const editUserById = (obj) => {
  return axios({
    url: `users/${obj.id}`,
    method: 'put',
    data: { email: obj.email, mobile: obj.mobile }
  })
}

// 删除用户
export const deleteById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 修改用户状态
export const changeStatus = (type, uid) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
