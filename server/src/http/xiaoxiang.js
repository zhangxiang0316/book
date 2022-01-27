/**
 * create by zhangxiang on 2021-12-12 20:39
 * 类注释：潇湘书院
 * 备注：
 */

const axios = require('axios')

const Http = axios.create({
  baseURL: 'http://biquge7.com',
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

