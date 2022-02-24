/**
 * create by zhangxiang on 2021-12-17 22:18
 * 类注释：书本网
 * 备注：
 */
const Http = require('../http/shubenwang')
const cheerio = require('cheerio')

const search = async(name) => {
  const res = await Http.get('/search/', { params: { searchkey: name }})
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.rank .item').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.image a').attr('href')
    obj.name = $(el).find('.image a').attr('title')
    obj.author = $(el).find('.btm a').text()
    obj.from = '书本网'
    obj.imgUrl = $(el).find('.image a img').attr('src')
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
  info.imgUrl = $('#sidebar #fmimg img').attr('data-original')
  info.name = $('#maininfo #info h1').text()
  info.status = '暂无'
  info.disc = $('#intro').text()
  $('#maininfo #info p').each(function(i, el) {
    if (i === 0) { info.author = $(el).text().replace(/&nbsp;/g, '').trim() }
    if (i === 3) { info.updataTime = $(el).text() }
    if (i === 5) {
      info.last = {
        url: $(el).find('a').attr('href'),
        from: '书本网',
        name: $(el).find('a').text()
      }
    }
  })
  $('#list dl a').each(function(i, el) {
    if ($(el).attr('href')) {
      const obj = {}
      obj.url = $(el).attr('href')
      obj.name = $(el).attr('title')
      obj.from = '书本网'
      arr.push(obj)
    }
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
  $('#booktxt p').each(function(i, el) {
    arr.push($(el).text())
  })
  detail.title = $('.box_con .bookname').text()
  detail.form = '书本网'
  detail.detail = arr
  detail.previewUrl = $('.bottem1 #prev_url').attr('href')
  detail.nextUrl = $('.bottem1 #next_url').attr('href')
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
