/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：黑岩小说
 * 备注：
 */
const Http = require('../http/heiyan')
const cheerio = require('cheerio')
const host = 'http://www.heiyan.org'

const search = async(name) => {
  const res = await Http.get('/plus/search.php', {
    params: {
      kwtype: 0,
      searchtype: '',
      q: name
    }
  })
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.container .so').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.pic a').attr('href')
    obj.name = $(el).find('h2 a').text()
    obj.author = $(el).find('.infos a').first().text()
    obj.from = '黑岩小说'
    obj.imgUrl = host + $(el).find('.pic img').attr('src')
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
  info.imgUrl = host + $('.book_info .pic img').attr('src')
  info.name = $('.book_info h1').text()
  info.author = $('.book_info .infos span').first().find('h3 a').text()
  info.disc = $('.book_info p').text()
  info.status = $('.book_info .infos span').first().next().next().text()
  info.updataTime = '无'
  $('.book_info .upd  a').each(function(i, el) {
    if (i === 1) {
      info.last = {
        url: $(el).attr('href'),
        from: '黑岩小说',
        name: $(el).text()
      }
    }
  })

  $('.book_list ul li').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '黑岩小说'
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
  $('.contentbox').html().split('<br>').forEach(item => {
    item && item.indexOf('<a') === -1 && arr.push(item.replace(/&nbsp;/g, ''))
  })
  detail.title = $('.wrapper_main .h1title h1').text().split('|')[1]
  detail.form = '黑岩小说'
  detail.detail = arr
  $('.chapter_Turnpage a').each(function(i, el) {
    if (i === 1) { detail.previewUrl = $(el).attr('href').indexOf('javascript') === -1 ? $(el).attr('href') : '' }
    if (i === 3) { detail.nextUrl = $(el).attr('href').indexOf('javascript') === -1 ? $(el).attr('href') : '' }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
