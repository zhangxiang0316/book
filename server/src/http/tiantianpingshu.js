/**
 * 天天评书
 */

const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.pingshu365.com',
  timeout: 100 * 1000
})

Http.interceptors.request.use(config => {
  config.headers['Host'] = 'www.pingshu365.com'
  config.headers['Content-Type'] = 'text/html'
  config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
  console.log(config)
  return config
})

Http.interceptors.response.use(response => {
  console.log(response)
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

