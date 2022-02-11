/**
 * create by zhangxiang on 2022-01-23 20:30
 * 类注释：听中国
 * 备注：
 */
const axios = require('axios')

const Http = axios.create({
  baseURL: 'https://www.tingxiaoshuo.cc',
  timeout: 100 * 1000
})

Http.interceptors.request.use(config => {
  config.headers['cookie'] = '__51vcke__JKeSBtlVceVtWkQX=67f27b38-0b4e-5e9c-9676-5bd4c6c122f0; __51vuft__JKeSBtlVceVtWkQX=1644296201108; Hm_lvt_03d3be6be07713090d718aa439330170=1644296202; _ga=GA1.2.2011447635.1644296202; gonggaotime=1644566081; __51uvsct__JKeSBtlVceVtWkQX=2; _gid=GA1.2.2648520.1644566171; PHPSESSID=o9a0cnul0m1unaanlpuav25a15; Hm_lpvt_03d3be6be07713090d718aa439330170=1644566548; _gat_gtag_UA_198991932_1=1; __vtins__JKeSBtlVceVtWkQX=%7B%22sid%22%3A%20%22aaf49552-51fe-592a-8cbe-251e9796c13a%22%2C%20%22vd%22%3A%2010%2C%20%22stt%22%3A%20414281%2C%20%22dr%22%3A%2038814%2C%20%22expires%22%3A%201644568384246%2C%20%22ct%22%3A%201644566584246%7D'
  config.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'

  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http
