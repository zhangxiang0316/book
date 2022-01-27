const Http = require('../http/xbiquge')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/modules/article/waps.php', qs.stringify({ searchkey: name }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.grid tr').each(function(i, el) {
    const obj = {}
    if (i > 0) {
      obj.menuUrl = $(el).find('.even a').attr('href')
      obj.name = $(el).find('.even a').text()
      obj.author = $(el).find('.even').text()
      obj.from = '新笔趣阁'
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
    if (i > 0) { info.disc = $(el).text() }
  })
  $('#maininfo #info p').each(function(i, el) {
    if (i === 0) { info.author = $(el).text().trim() }
    if (i === 2) { info.updataTime = $(el).text() }
    if (i === 3) {
      info.last = {
        url: $(el).find('a').attr('href'),
        from: '新笔趣阁',
        name: $(el).find('a').text()
      }
    }
  })
  $('.box_con  #list dl dd').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '新笔趣阁'
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
  const $ = cheerio.load(res)
  const detail = {}
  const arr = []
  $('#content').html().split('<br>').map(item => {
    if (item.indexOf('<p') == -1 && item.indexOf('p>') == -1) {
      const line = item.replace(/&nbsp;/g, '').replace('\n', '')
      if (line) { arr.push(line) }
    }
  })
  detail.title = $('.bookname h1').text()
  detail.form = '新笔趣阁'
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
