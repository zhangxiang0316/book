/**
 * create by zhangxiang on 2022-02-12 14:52
 * 类注释：听书网
 * 备注：
 */

const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://m.yiyeting.com',
  timeout: 100 * 1000
})

Http.interceptors.request.use(config => {
  config.headers['cookie'] = 'UM_distinctid=17eecb37d5d5c8-027ed89832c90a-4303066-144000-17eecb37d5edc3; CNZZDATA1280832845=483785519-1644642733-%7C1644642733; PHPSESSID=vv6mslip7ipg54f5fkrbteunb5; shistory=think%3A%5B%22%25E5%2587%25A1%25E4%25BA%25BA%25E4%25BF%25AE%25E4%25BB%2599%25E4%25BC%25A0%22%5D'
  config.headers['user-agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  config.headers['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  config.headers['referer'] = 'https://m.yiyeting.com/'
  config.headers['sec-fetch-dest'] = 'document'
  config.headers['sec-fetch-mode'] = 'navigate'
  config.headers['sec-fetch-site'] = 'same-origin'
  config.headers['sec-fetch-user'] = '?1'
  config.headers['upgrade-insecure-requests'] = '1'
  config.headers['accept-encoding'] = 'gzip, deflate, br'
  config.headers['accept-language'] = 'zh-CN,zh;q=0.9'
  config.headers['cache-control'] = 'max-age=0'
  console.log(config)
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

