/**
 * create by zhangxiang on 2021-12-23 10:05
 * ��ע�ͣ�00С˵
 * ��ע��
 */
const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.xs26.com',
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

