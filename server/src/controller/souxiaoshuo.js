const Http = require('../http/souxiaoshuo')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/search.html', qs.stringify({ searchkey: name, searchtype: 'all' }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.novelslist2 ul li').each(function(i, el) {
    if (i > 0) {
      const obj = {}
      obj.menuUrl = $(el).find('.s2 a').attr('href')
      obj.name = $(el).find('.s2 a').text()
      obj.author = $(el).find('.s4').first('span').text()
      obj.from = '搜小说'
      obj.imgUrl = ''
      bookArr.push(obj)
    }
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
  info.imgUrl = 'http:' + $('.book_info .book_cover img').attr('src')
  info.name = $('.xiaoshuo h1').text()
  info.author = $('.xiaoshuo h6').text()
  info.disc = $('.xiaoshuo .intro #intro').first().text()
  info.updataTime = $('.xiaoshuo h5').last().text()
  info.last = {
    url: $('.xiaoshuo h5 a').attr('href'),
    from: '搜小说',
    name: $('.xiaoshuo h5 a').text()
  }
  $('.novel_list').last().find('dl dd').each(function(i, ele) {
    const obj = {}
    obj.name = $(ele).find('a').text()
    obj.url = $(ele).find('a').attr('href')
    obj.from = '搜小说'
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
  $('.content').html().split('<br>').forEach(item => {
    item && item.indexOf('<a') === -1 && arr.push(item.replace(/&nbsp;/g, '').replace(/\n/g, ''))
  })
  detail.title = $('.read_title h1').text()
  detail.form = '搜小说'
  detail.detail = arr
  $('.pagego a').each(function(i, el) {
    if (i === 1) { detail.previewUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : '' }
    if (i === 2) { detail.nextUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : '' }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
