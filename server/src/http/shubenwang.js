/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：思路客
 * 备注：
 */

const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.bookben.net',
  timeout: 60 * 1000,
  withCredentials: true
})

Http.interceptors.request.use(config => {
  config.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

