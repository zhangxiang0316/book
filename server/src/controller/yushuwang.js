/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：御书网
 * 备注：
 */
const Http = require('../http/yushuwang')
const cheerio = require('cheerio')
let cookie = ''
const search = async(name) => {
  let res = await Http.get(`/search.html?ss=${encodeURIComponent(name)}`)
  let $ = cheerio.load(res.toString())
  if (!$('title').text()) {
    $(' script').map(function(i, el) {
      if (i === 0) {
        const text = $(this)[0].children[0].data
        const matchNow = text.match(/document.cookie = (.*);/)
        // eslint-disable-next-line no-eval
        cookie = eval(matchNow[1])
        console.log(cookie)
      }
    })
    res = await Http.get(`search.html?ss=${encodeURIComponent(name)}`, { headers: {
      cookie: cookie
    }})
    $ = cheerio.load(res.toString())
  }
  const bookArr = []
  $('.search-list ul li').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.tit').attr('href')
    obj.name = $(el).find('.tit').text()
    obj.author = $(el).find('.info span').text()
    obj.from = '御书网'
    obj.imgUrl = $(el).find('.pic').attr('src')
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
  info.imgUrl = $('.book-info .base dt .lazy').attr('src')
  info.name = $('.book-info .base dd h2').text()
  info.status = $('.book-info .base dt i').text()
  info.disc = $('.book-info .intro .content').text().replace(/\n/g, '')
  info.author = $('.book-info dd .info span').eq(1).text()
  info.updataTime = $('.book-info .info span').eq(4).text()
  info.last = {
    url: $('.mod-attentions').eq(0).find('.attentions ul li').first().find('a').attr('href'),
    from: '御书网',
    name: $('.mod-attentions').eq(0).find('.attentions ul li').first().find('a').text()
  }
  $('.bookshelf-panel li').each(function(i, el) {
    const obj = {}
    obj.url = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '御书网'
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
  $('.jsChapterWrapper p').each(function(i, el) {
    const data = $(el).text().trim()
    if (data) { data && arr.push(data) }
  })

  detail.title = $('.jsChapterWrapper h3').text()
  detail.form = '御书网'
  detail.detail = arr
  $('.chapter-porn a').each(function(i, el) {
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
