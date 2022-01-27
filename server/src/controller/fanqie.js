/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：
 * 备注：
 */
const Http = require('../http/fanqie')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/modules/article/search.php', qs.stringify({ keyword: name }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.novelslist2 li').each(function(i, el) {
    const obj = {}
    if (i > 0) {
      obj.menuUrl = $(el).find('.s2 a').attr('href')
      obj.name = $(el).find('.s2 a').text()
      obj.author = $(el).find('.s4').text()
      obj.from = '番茄小说'
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
  const data = await Http.get(menuUrl)
  const $ = cheerio.load(data.toString())
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = $('#sidebar #fmimg img').attr('src')
  info.name = $('#maininfo #info h1').text()
  info.status = '暂无'
  $('#intro p').each(function(i, el) {
    if (i == 0) { info.disc = $(el).text() }
  })
  $('#maininfo #info p').each(function(i, el) {
    if (i === 0) { info.author = $(el).text().replace(/&nbsp;/g, '').trim() }
    if (i === 2) { info.updataTime = $(el).text() }
    if (i === 3) {
      info.last = {
        url: $(el).find('a').attr('href'),
        from: '番茄小说',
        name: $(el).find('a').text()
      }
    }
  })
  $('.box_con  #list dl dd').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '番茄小说'
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
  detail.form = '番茄小说'
  detail.detail = arr
  $('.bottem2 a').each(function(i, el) {
    if (i === 0) { detail.previewUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : '' }
    if (i === 2) { detail.nextUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : '' }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
