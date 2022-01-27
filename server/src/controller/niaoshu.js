/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：鸟叔网
 * 备注：
 */
const Http = require('../http/niaoshu')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/read/search/', qs.stringify({ searchkey: name }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.so_list .type_show .bookbox').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.bookimg a').attr('href')
    obj.name = $(el).find('.bookinfo h4 a').text()
    obj.author = $(el).find('.bookinfo .author').text()
    obj.from = '鸟书网'
    obj.imgUrl = 'https://www.99mk.com' + $(el).find('.bookimg a img').attr('src')
    bookArr.push(obj)
  })
  return bookArr
}

/**
 * 获取章节列表
 * @param menuUrl
 * @returns {Promise<{}>}
 */
const getMenuList = async(menuUrl) => {
  const bookDetail = {}
  const info = {}
  const arr = []
  const data = await Http.get(menuUrl)
  const $ = cheerio.load(data)
  info.imgUrl = 'https://www.99mk.com' + $('.info .cover img').attr('src')
  info.name = $('.info h2').text()
  info.disc = $('.info .intro').text().replace(/\t/g, '').replace(/\n/g, '').trim()
  $('.info .small span').each(function(i, el) {
    if (i === 0) { info.author = $(el).text() }
    if (i === 2) { info.status = $(el).text() }
    if (i === 4) { info.updataTime = $(el).text() }
    if (i === 5) {
      info.last = {
        url: $(el).find('a').attr('href'),
        from: '鸟书网',
        name: $(el).find('a').text()
      }
    }
  })
  $('.listmain dd').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = $(el).find('a').attr('href')
    obj.from = '鸟书网'
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
  const res = await Http.get(detailUrl)
  const $ = cheerio.load(res.toString())
  const detail = {}
  const arr = []
  $('#content').html().split('<br>').map(item => {
    item.replace(/&nbsp;/g, '').toString().trim() && arr.push(item.replace(/&nbsp;/g, '').toString().trim())
  })
  detail.title = $('.content h1').text()
  detail.form = '鸟书网'
  detail.detail = arr
  $('.page_chapter ul li').each(function(i, el) {
    if (i == 0) { detail.previewUrl = $(el).find('a').attr('href').indexOf('.html') != -1 ? $(el).find('a').attr('href') : '' }
    if (i == 2) { detail.nextUrl = $(el).find('a').attr('href').indexOf('.html') != -1 ? $(el).find('a').attr('href') : '' }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
