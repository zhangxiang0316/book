/**
 * create by zhangxiang on 2021-12-23 10:05
 * 类注释：六月听书
 * 备注：
 */
const axios = require('axios')

const Http = axios.create({
  baseURL: 'http://www.6yueting.com',
  timeout: 60 * 1000,
  withCredentials: true
})

Http.interceptors.request.use(config => {
  const time = parseInt(new Date().getTime() / 1000)
  config.headers['cookie'] = `UM_distinctid=17e481434b74a0-04328d1c0afd18-3b39580e-1fa400-17e481434b8a05;Hm_lvt_f056b8aa6a4df11eaf82501c2a05cbf9=${time + 91301},${time + 176416};CNZZDATA1277818387=1819932895-1641882031-null%7C1641967203;Hm_lpvt_f056b8aa6a4df11eaf82501c2a05cbf9=${time - 600}`
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

