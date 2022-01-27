/**
 * create by zhangxiang on 2022-01-23 20:30
 * 类注释：听中国
 * 备注：
 */
const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.tingxiaoshuo.cc',
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
