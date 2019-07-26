import axios from '@/utils/axios.js'
// 获取角色列表
export const getRole = () => {
  return axios({
    url: '/roles'
  })
}

// 添加角色
export const addRole = (data) => {
  return axios({
    url: '/roles',
    method: 'post',
    data
  })
}

// 编辑角色
export const editRole = (id, data) => {
  return axios({
    url: `/roles/${id}`,
    method: 'put',
    data
  })
}
