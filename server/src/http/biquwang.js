/**
 * create by zhangxiang on 2021-12-18 10:22
 * 类注释：笔趣网
 * 备注：
 */
const axios = require('axios')

const Http = axios.create({
  baseURL: 'http://www.biquw.com',
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
