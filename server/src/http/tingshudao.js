// 听书岛
const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.tingshudao.com',
  timeout: 100 * 1000
})

Http.interceptors.request.use(config => {
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

