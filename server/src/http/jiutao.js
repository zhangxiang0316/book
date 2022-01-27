/**
 * create by zhangxiang on 2021-12-23 10:05
 * 类注释：九桃小说
 * 备注：
 */
const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.9txs.org/',
  timeout: 60 * 1000,
  withCredentials: true
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

