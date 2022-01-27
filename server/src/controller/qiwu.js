const Http = require('../http/qiwu')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/search.html', qs.stringify({ searchkey: name, searchtype: 'all' }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('#sitembox dl').each(function(i, el) {
    const obj = {}
    obj.menuUrl = 'https://www.75txt.com' + $(el).find('dt a').attr('href')
    obj.name = $(el).find('dd h3 a').text()
    obj.author = $(el).find('.book_other').first('span').text()
    obj.from = '起舞小说'
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
  const bookDetail = {}
  const info = {}
  const arr = []
  const data = await Http.get(menuUrl)
  const $ = cheerio.load(data.toString())
  info.imgUrl = 'http:' + $('#sidebar #fmimg img').attr('src')
  info.name = $('#maininfo #info h1').text()
  info.disc = $('#maininfo #intro p').first().text()
  $('#maininfo #info p').each(function(i, el) {
    if (i === 0) { info.author = $(el).find('a').text() }
    if (i === 2) { info.updataTime = $(el).text() }
    if (i === 3) {
      info.last = {
        url: $(el).find('a').attr('href'),
        from: '起舞小说',
        name: $(el).find('a').text()
      }
    }
  })
  $('#list dl dd').each(function(i, ele) {
    const obj = {}
    obj.name = $(ele).find('a').text()
    obj.url = $(ele).find('a').attr('href')
    obj.from = '起舞小说'
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
  detail.form = '起舞小说'
  detail.detail = arr
  $('.bottem2 a').each(function(i, el) {
    if (i === 1) { detail.previewUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : '' }
    if (i === 3) { detail.nextUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : '' }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
