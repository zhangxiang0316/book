/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：妙笔阁
 * 备注：
 */
const Http = require('../http/miaobige')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/search.html', qs.stringify({ searchkey: name }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('#sitembox dl').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('dt a').attr('href')
    obj.name = $(el).find('dd h3 a').text()
    obj.author = $(el).find('.book_other').first().find('a').last().text()
    obj.from = '妙笔阁'
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
  let data = await Http.get(menuUrl)
  let $ = cheerio.load(data.toString())
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = $('#bookinfo .bookleft #bookimg img').attr('src')
  info.name = $('#bookinfo .bookright .booktitle h1').text()
  info.author = $('#bookinfo .bookright .booktitle span a ').text()
  info.disc = $('#bookinfo .bookright #bookintro').text()
  info.updataTime = $('#bookinfo .bookright .new .uptime').text()
  info.last = {
    url: $('#bookinfo .bookright .new .keywords a').attr('href'),
    from: '妙笔阁',
    name: $('#bookinfo .bookright .new .keywords a').text()
  }
  $('#bookinfo .bookright .count ul li').each(function(i, el) {
    if (i === 1) { info.status = $(el).find('span').text() }
  })
  menuUrl = $('#newlist .newrap a').attr('href')
  data = await Http.get(menuUrl)
  $ = cheerio.load(data.toString())

  $('#readerlists ul').last().find('li').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '妙笔阁'
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
  detail.title = $('#center .title h1').text()
  detail.form = '妙笔阁'
  detail.detail = arr
  $('.jump a').each(function(i, el) {
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
