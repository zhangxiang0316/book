/**
 * create by zhangxiang on 2021-12-17 22:18
 * 类注释：00小说
 * 备注：
 */
const Http = require('../http/lingling')
const cheerio = require('cheerio')

const search = async(name) => {
  const res = await Http.get('/modules/article/search.php', { params: { q: name }})
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.grid #nr').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.odd a').attr('href')
    obj.name = $(el).find('.odd a').text()
    obj.author = $(el).find('.odd').slice(1, 2).text()
    obj.from = '00小说'
    obj.imgUrl = ''
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
        from: '00小说',
        name: $(el).find('a').text()
      }
    }
  })
  $('#list dl dd').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '00小说'
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
    item.replace(/&nbsp;/g, '') && arr.push(item.replace(/&nbsp;/g, ''))
  })
  detail.title = $('.bookname h1').text()
  detail.form = '00小说'
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
