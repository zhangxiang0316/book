/**
 * create by zhangxiang on 2022-01-15 14:04
 * 类注释：275 听书网
 * 备注：
 */
const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.i275.com',
  timeout: 100 * 1000
})

const cookie = new Date().getTime()

Http.interceptors.request.use(config => {
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http
