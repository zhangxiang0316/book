/**
 * create by zhangxiang on 2021-12-08 20:07
 * 类注释：西红柿
 * 备注：
 */
const axios = require('axios')
const { xihongshi_Host } = require('../conf/conf')

const Http = axios.create({
  baseURL: xihongshi_Host,
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

