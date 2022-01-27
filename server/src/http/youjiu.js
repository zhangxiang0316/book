/**
 * create by zhangxiang on 2021-12-08 20:07
 * 类注释:悠久
 * 备注：
 */
const axios = require('axios')

const Http = axios.create({
  // baseURL: "http://www.ujxs.com",
  baseURL: 'http://www.ujxsw.com',
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
