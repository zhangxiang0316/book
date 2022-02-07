/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：起舞小说
 * 备注：
 */

const axios = require('axios')

const cookie = parseInt(Math.random() * 1000000)

const Http = axios.create({
  // https://www.soxs.cc
  baseURL: 'https://www.soxscc.org',
  timeout: 60 * 1000,
  withCredentials: true
})

Http.interceptors.request.use(config => {
  config.headers['cookie'] = `Hm_lvt_f7367c7fa7b1846873d96542dfea2824=${cookie}; Hm_lpvt_f7367c7fa7b1846873d96542dfea2824=${cookie}`
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

