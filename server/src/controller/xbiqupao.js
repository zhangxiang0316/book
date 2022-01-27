const Http = require('../http/xbiqupao')
const cheerio = require('cheerio')

/**
 * 根据名称作者查询图书
 * @param name
 * @returns {Promise<*[]>}
 */
const search = async(name) => {
  const res = await Http.get(`/searchbook.php?search_key=${encodeURI(name)}`)
  const $ = cheerio.load(res)
  const bookArr = []
  $('.name', '.nrrk').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.author = $(el).find('span')[1].children[0].data
    obj.from = '笔趣泡'
    bookArr.push(obj)
  })
  $('.pic', '#li1').each(function(i, el) {
    bookArr[i].imgUrl = $(el).find('img').attr('src')
  })
  return bookArr
}

/**
 * 获取图书章节
 * @param menuUrl
 * @returns {Promise<{}>}
 */
const getMenuList = async(menuUrl) => {
  const res = await Http.get(menuUrl)
  const $ = cheerio.load(res)
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = $('#sidebar #fmimg img').attr('src')
  info.name = $('#maininfo #info h1').text()
  info.disc = $('#maininfo #intro').text().replace(/\n/, '')
  $('#maininfo #info p').each(function(i, el) {
    if (i === 0) { info.author = $(el).text().replace(/&nbsp;/g, '').trim() }
    if (i === 1) { info.status = $(el).text().replace(/&nbsp;/g, '').trim() }
    if (i === 2) { info.updataTime = $(el).text() }
    if (i === 3) {
      info.last = {
        url: $(el).find('a').attr('href'),
        from: '笔趣泡',
        name: $(el).find('a').text()
      }
    }
  })
  $('.box_con #list dd').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '笔趣泡'
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
  detail.detail = arr
  detail.from = '笔趣泡'
  $('.bookname .bottem1 a').each(function(i, el) {
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
