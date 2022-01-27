/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：微风小说
 * 备注：
 */
const Http = require('../http/weifeng')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/s.html', qs.stringify({ s: name, type: 'articlename' }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('#sitembox dl').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('dt a').attr('href')
    obj.name = $(el).find('dd h3 a').text()
    obj.author = $(el).find('.book_other span').first().text()
    obj.from = '微风小说'
    obj.imgUrl = $(el).find('dt a img').attr('_src')
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
  info.imgUrl = $('#bookinfo .bookleft #bookimg img').attr('_src')
  info.name = $('#bookinfo .bookright .booktitle h1').text()
  info.author = $('#bookinfo .bookright .booktitle #author a ').text()
  info.disc = $('#bookinfo .bookright #bookintro').text()
  info.updataTime = $('#bookinfo .bookright .new .uptime').text()
  info.last = {
    url: $('#bookinfo .bookright .new .keywords a').attr('href'),
    from: '微风小说',
    name: $('#bookinfo .bookright .new .keywords a').text()
  }
  $('#bookinfo .bookright .count ul li').each(function(i, el) {
    if (i === 1) { info.status = $(el).find('span').text() }
  })
  menuUrl = $('#bookinfo .motion .tgcj').attr('href')
  data = await Http.get(menuUrl)
  $ = cheerio.load(data.toString())

  $('#readerlists ul li').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '微风小说'
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
    arr.push($(el).text().replace(/&nbsp;/g, ''))
  })
  detail.title = $('#center .title h1').text()
  detail.form = '微风小说'
  detail.detail = arr
  $('.jump a').each(function(i, el) {
    if (i === 0) { detail.previewUrl = $(el).attr('href') }
    if (i === 3) { detail.nextUrl = $(el).attr('href') }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
