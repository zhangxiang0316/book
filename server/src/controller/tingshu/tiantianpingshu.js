/**
 * create by zhangxiang on 2021-12-17 22:18
 * 类注释：天天评书
 * 备注：
 */
const Http = require('../../http/tiantianpingshu')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const gbk = require('../../utils/gbk')

/**
 * 根据名称作者查询图书
 * @param name
 * @returns {Promise<*[]>}
 */

const search = async(name) => {
  const bookArr = []
  // let res = await Http.get(`/search/search.asp?stype=1&keyword=${gbk.encode(name)}`, {
  //   responseType: 'arraybuffer',
  //   headers: {
  //     Host: 'www.pingshu365.com',
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
  //   }
  // })
  let res = await Http.get(`/search/search.asp?stype=1&keyword=${gbk.encode(name)}`)
  res = iconv.decode(Buffer.from(res), 'gbk')
  // console.log(res)
  // const $ = cheerio.load(res.toString())
  // $('#ss .book').each(function(i, el) {
  //   const obj = {}
  //   console.log(i)
  //   obj.menuUrl = $(el).find('.pic a').attr('href')
  //   obj.name = $(el).find('.pic a').attr('title')
  //   obj.author = $(el).find('ul li').first().text()
  //   obj.from = '天天评书'
  //   obj.imgUrl = $(el).find('.pic img').attr('src')
  //   bookArr.push(obj)
  // })
  return res
}

/**
 * 获取图书章节
 * @param menuUrl
 * @returns {Promise<{}>}
 */
const getMenuList = async(menuUrl) => {
  let res = await Http.get(menuUrl, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = $('#fmimg img').attr('src')
  info.name = $('#maininfo #info h1').text()
  info.disc = $('#maininfo #info #intro').text().replace(/\t/g, '').replace(/\n/g, '').toString().trim()
  info.updataTime = $('#maininfo #info p').eq(2).text()
  info.author = $('#maininfo #info p').first().find('a').text()
  info.status = '暂无'
  $('.mu_contain .mulu_list li').each(function(i, el) {
    const obj = {}
    obj.url = menuUrl + $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '墨缘文学'
    arr.push(obj)
  })
  bookDetail.info = info
  bookDetail.list = arr
  return bookDetail
}

/**
 * 获取章节详情
 * @param detailUrl
 * @returns {Promise<{}>}
 */
const getBookDetail = async(detailUrl) => {
  let res = await Http.get(detailUrl, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const detail = {}
  const arr = []
  $('#htmlContent').html().split('<br><br>').map(item => {
    item.toString().trim() && arr.push(item.toString().trim())
  })
  detail.title = $('#content h1').text()
  detail.detail = arr
  detail.from = '墨缘文学'
  detail.previewUrl = $('#link-preview').attr('href').indexOf('.html') != -1 ? $('#link-preview').attr('href') : ''
  detail.nextUrl = $('#link-next').attr('href').indexOf('.html') != -1 ? $('#link-next').attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
