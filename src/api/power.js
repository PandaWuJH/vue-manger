import axios from '@/utils/axios.js'
// 获取所有权限列表
export const getAllPower = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 删除角色指定权限
export const delPower = (roleId, powerId) => {
  return axios({
    url: `roles/${roleId}/rights/${powerId}`,
    method: 'delete'
  })
}

// 授权权限
export const impower = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}

// 获取左侧菜单权限
export const getMenus = () => {
  return axios({
    url: `menus`
  })
}
