// ÓùÊéÍø
const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://m.yushubo.net/',
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
