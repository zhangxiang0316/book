// 笔下文学
const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.bxwxorg.com/',
  timeout: 60 * 1000,
  withCredentials: true
})

Http.interceptors.request.use(config => {
  config.headers['cookie'] = `Hm_lvt_6fc4ff5f8f53a5c9ef0c1146ad0937f8=${Date.now() / 1000}; Hm_lpvt_6fc4ff5f8f53a5c9ef0c1146ad0937f8=${Date.now() / 1000}`
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

