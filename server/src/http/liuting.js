/**
 * create by zhangxiang on 2022-04-10 16:07
 * 类注释：六六听网
 * 备注：
 */
const axios = require('axios')

const Http = axios.create({
  baseURL: 'http://www.6ting.cn',
  timeout: 60 * 1000,
  withCredentials: true
})

Http.interceptors.request.use(config => {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['Cookie'] = `zh_choose=n; __51vcke__JdYPhb8ZRLDCiHjj=747bc699-98a0-5bf9-8d90-8fd6b2ee5b5b; __51vuft__JdYPhb8ZRLDCiHjj=1649574655730; PHPSESSID=34sv003bsl48fe6i68sr5aj7k6; Hm_lvt_fe4307f12b4befd6ca9d4793216a7767=1649574657; __51uvsct__JdYPhb8ZRLDCiHjj=2; __vtins__JdYPhb8ZRLDCiHjj=%7B%22sid%22%3A%20%221f35a85d-be82-53dd-8d99-ca15191321a3%22%2C%20%22vd%22%3A%206%2C%20%22stt%22%3A%20631043%2C%20%22dr%22%3A%20273226%2C%20%22expires%22%3A%201649579659686%2C%20%22ct%22%3A%201649577859686%7D; Hm_lpvt_fe4307f12b4befd6ca9d4793216a7767=1649577860`
  config.headers['Referer'] = 'http://www.6ting.cn/play/33847-0-.html'
  return config
})

Http.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

module.exports = Http

