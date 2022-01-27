/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：九桃小说
 * 备注：
 */
const Http = require('../http/jiutao')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('https://so.9txs.org/www/', qs.stringify({ searchkey: name }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.main .layui-main .library li').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.bookimg').attr('href')
    obj.name = $(el).find('.bookname').text()
    obj.author = $(el).find('.author').text()
    obj.from = '九桃小说'
    obj.imgUrl = $(el).find('.bookimg img').attr('src')
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
  let data = await Http.get(menuUrl)
  let $ = cheerio.load(data.toString())
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = $('.left  .detail .bookimg img').attr('src')
  info.name = $('.left  .detail h1').text()
  info.author = $('.left .detail p').first().find('a').first().text()
  info.disc = $('.left .content .intro').text()
  info.updataTime = '无'
  $('.left  .detail p').each(function(i, el) {
    if (i === 3) {
      info.last = {
        url: $(el).find('a').attr('src'),
        from: '九桃小说',
        name: $(el).find('a').text()
      }
    }
  })
  menuUrl = $('.left .box').last().find('.title a').attr('href')
  data = await Http.get(menuUrl)
  $ = cheerio.load(data.toString())

  $('.read dl').last().find('dd').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '九桃小说'
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
  detail.title = $('.area h1').text()
  detail.form = '九桃小说'
  detail.detail = arr
  $('.page a').each(function(i, el) {
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
