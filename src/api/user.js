import axios from '@/utils/axios.js'
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
