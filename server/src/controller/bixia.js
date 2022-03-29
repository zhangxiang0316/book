/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：丹书铁卷
 * 备注：
 */
const Http = require('../http/bixia')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/search.html', qs.stringify({ searchkey: name, searchtype: 'all' }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('#sitembox dl').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('dd h3 a').attr('href')
    obj.name = $(el).find('dd h3 a').text()
    obj.author = $(el).find('.book_other span').first().text()
    obj.from = '笔下文学'
    obj.imgUrl = $(el).find('dt a img').attr('src')
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
  const data = await Http.get(menuUrl)
  const $ = cheerio.load(data.toString())
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = $('#fmimg img').attr('src')
  info.name = $('#info h1').text()
  info.status = '暂无'
  info.disc = $('#intro p').text().replace(/\n/g, '')
  info.author = $('#info p a').first().text()
  $('#list dl dd').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '笔下文学'
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
  $('#content p').each(function(i, el) {
    arr.push($(el).text())
  })
  detail.title = $('.bookname h1').text()
  detail.form = '笔下文学'
  detail.detail = arr
  detail.previewUrl = $('#A1').attr('href').indexOf('.html') != -1 ? $('#A1').attr('href') : ''
  detail.nextUrl = $('#A3').attr('href').indexOf('.html') != -1 ? $('#A3').attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
