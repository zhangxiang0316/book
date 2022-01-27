const Http = require('../http/yongsheng')
const cheerio = require('cheerio')
const qs = require('qs')
const { yongsheng_Host } = require('../conf/conf')

const search = async(name) => {
  const res = await Http.post('/modules/article/search.php', qs.stringify({
    searchkey: name,
    searchtype: 'articlename'
  }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.info').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('h2 a').attr('href')
    obj.name = $(el).find('h2 b a').text()
    $(el).find('li font').each(function(j, ele) {
      if (j == 0) { obj.author = $(ele).text() }
    })
    obj.from = '永生文学'
    obj.imgUrl = yongsheng_Host + $(el).find('a img').attr('src')
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
  let arr = []
  let data = await Http.get(menuUrl)
  let $ = cheerio.load(data.toString())
  info.imgUrl = yongsheng_Host + $('.articleInfo .articleInfoLeft p a img').attr('src')
  info.name = $('.articleInfo .articleInfoRight h1').text()
  $('.articleInfo .articleInfoRight b').each(function(i, el) {
    if (i == 0) { info.author = $(el).text() }
  })
  info.disc = $('#wrap').text()
  info.updataTime = $('.articleInfoRight dl dt span').text()
  info.status = '暂无'
  info.last = {
    url: $('.articleInfoRight span a').attr('href'),
    from: '永生文学',
    name: $('.articleInfoRight span a').text()
  }
  menuUrl = $('.articleInfo .articleInfoRight ol .right a').attr('href')
  data = await Http.get(menuUrl)
  $ = cheerio.load(data.toString())
  $('#newlist div').each(function(i, el) {
    const id = $(el).attr('data-id')
    const list = {
      id: id,
      arr: []
    }
    $(el).find('li').each(function(i, ele) {
      const obj = {}
      obj.name = $(ele).find('a').text()
      obj.url = menuUrl + $(ele).find('a').attr('href')
      obj.from = '永生文学'
      list.arr.push(obj)
    })
    arr.push(list)
  })
  arr = arr.sort(function(x, y) {
    return parseInt(x.id) - parseInt(y.id)
  })
  const list = []
  arr.map(item => {
    item.arr.map(ite => {
      list.push(ite)
    })
  })
  bookDetail.info = info
  bookDetail.list = list
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
  let arr = []
  $('#content p').each(function(i, el) {
    const id = $(el).attr('data-id')
    const list = {
      id: id,
      arr: []
    }
    $(el).html().split('<br>').map(item => {
      const obj = {}
      const line = item.replace(/&nbsp;/g, '').replace(/\n/g, '')
      if (line) {
        obj.name = line
        list.arr.push(obj)
      }
    })
    arr.push(list)
  })
  arr = arr.sort(function(x, y) {
    return parseInt(x.id) - parseInt(y.id)
  })
  const list = []
  arr.map(item => {
    item.arr.map(ite => {
      list.push(ite.name)
    })
  })
  detail.title = $('.readerTitle h1').text()
  detail.form = '永生文学'
  detail.detail = list
  let next, preview, mulu
  $('.readerFooterPage a').each(function(i, el) {
    if (i == 0) { preview = $(el).attr('href') } else if (i == 1) { mulu = $(el).attr('href') } else if (i == 2) { next = $(el).attr('href') }
  })
  detail.previewUrl = preview.indexOf('.html') != -1 ? mulu + preview : ''
  detail.nextUrl = next.indexOf('.html') != -1 ? mulu + next : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
