const axios = require('axios')

const Http = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL,
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 60 * 1000
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

