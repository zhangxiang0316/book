/**
 * create by zhangxiang on 2021-12-18 10:22
 * 类注释：笔趣网
 * 备注：
 */
const Http = require('../http/biquwang')
const cheerio = require('cheerio')

const search = async(name) => {
  const res = await Http.get('/modules/article/search.php', { params: { action: 'login', searchkey: name }})
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.toplist ul li').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.s1 a').attr('href')
    obj.name = $(el).find('.s1 a').text()
    obj.author = $(el).find('.s3').text()
    obj.from = '笔趣网'
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
  info.imgUrl = 'http://www.biquw.com' + $('.book_info .pic img').attr('src')
  info.name = $('.book_info #info h1').text()
  info.status = '暂无'
  info.disc = $('.book_info #info .bookinfo_intro').text()
  info.last = {
    url: menuUrl + $('.book_info #info .update a').attr('href'),
    from: '笔趣网',
    name: $('.book_info #info .update a').text()
  }
  $('.book_info #info .options span').each(function(i, el) {
    if (i === 0) { info.author = $(el).text().trim() }
    if (i === 1) { info.updataTime = $(el).text() }
  })
  $('.book_list ul li').each(function(i, el) {
    const obj = {}
    obj.url = menuUrl + $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '笔趣网'
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
  $('#htmlContent').html().split('<br>').map(item => {
    if (item.indexOf('<p') == -1 && item.indexOf('p>') == -1) {
      const line = item.replace(/&nbsp;/g, '').replace('\n', '')
      if (line) { arr.push(line) }
    }
  })
  detail.title = $('.wrapper_main .h1title h1').text()
  detail.form = '笔趣网'
  detail.detail = arr
  $('.chapter_Turnpage a').each(function(i, el) {
    if (i === 0) { detail.previewUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : '' }
    if (i === 4) { detail.nextUrl = $(el).attr('href').indexOf('.html') != -1 ? $(el).attr('href') : '' }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
