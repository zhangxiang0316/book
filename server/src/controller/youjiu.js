const Http = require('../http/youjiu')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/searchbooks.php', qs.stringify({ searchkey: name }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.shulist ul').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.three a').first().attr('href')
    obj.name = $(el).find('.three a').first().text()
    obj.author = $(el).find('.four a').text()
    obj.from = '悠久小说'
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
  const bookDetail = {}
  const info = {}
  const arr = []
  let data = await Http.get(menuUrl)
  let $ = cheerio.load(data.toString())
  info.imgUrl = $('#bookinfo .bookleft .img img').attr('src')
  info.name = $('#maininfo .coverecom .tabstit a').last().text()
  info.author = $('.bookright .d_title h1 a').text()
  info.disc = $('.bookright #bookintro').text().toString().replace(/&nbsp;/g, '')
  info.updataTime = $('.bookright .new .new_p').text()
  info.status = '暂无'
  info.last = {
    url: $('.bookright .new .new_t a').attr('href'),
    from: '悠久小说',
    name: $('.bookright .new .new_t a').text()
  }
  menuUrl = $('.bookright .motion a').first().attr('href')
  data = await Http.get(menuUrl)
  $ = cheerio.load(data.toString())
  $('#readerlist ul li').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = $(el).find('a').attr('href')
    obj.from = '悠久小说'
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
  $('.read-content p').html().split('<br>').forEach(item => {
    item.replace(/&nbsp;/g, '').replace(/\n/g, '') && arr.push(item.replace(/&nbsp;/g, '').replace(/\n/g, ''))
  })
  detail.title = $('#mlfy_main_text .zhangj').text()
  detail.form = '悠久小说'
  detail.detail = arr
  $('.mlfy_page a').each(function(i, el) {
    if (i === 0) { detail.previewUrl = $(el).attr('href').indexOf('/0.html') === -1 ? $(el).attr('href') : '' }
    if (i === 2) { detail.nextUrl = $(el).attr('href').indexOf('/0.html') === -1 ? $(el).attr('href') : '' }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
