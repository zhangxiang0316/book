const Http = require('../http/wudi')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/search.html', qs.stringify({ key: name }))
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.leftBox ul li').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('.sCboxBookParR .top h1 a').attr('href')
    obj.name = $(el).find('.sCboxBookParR .top h1 a').text()
    obj.author = $(el).find('.sCboxBookParR .top .s2').text()
    obj.from = '无敌小说网'
    obj.imgUrl = 'http:' + $(el).find('.sCboxBookParL img').attr('data-original')
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
  info.imgUrl = 'http:' + $('.imgBox img').attr('src')
  info.name = $('.other .titleOrOther h1').text()
  info.author = $('.other .titleOrOther .s2').text()
  $('.brief').each(function(i, el) {
    if (i == 0) {
      info.disc = $(el).text().replace(/\n/g, '').replace(/\t/g, '').replace(/&nbsp;/g, '')
    }
  })
  $('.other .tips a').each(function(i, el) {
    if (i === 1) {
      info.status = $(el).text()
    }
  })
  info.last = {
    url: $('.other .news a').attr('href'),
    from: '无敌小说网',
    name: $('.other .news a').text()
  }

  $('.other .button a').each(function(i, el) {
    if (i === 0) {
      menuUrl = $(el).attr('href')
    }
  })
  data = await Http.get(menuUrl)
  $ = cheerio.load(data.toString())
  $('#newlist div').each(function(i, el) {
    const id = $(el).attr('data-id')
    const list = {
      id: id,
      arr: []
    }
    $(el).find('dd').each(function(i, ele) {
      const obj = {}
      obj.name = $(ele).find('a').text()
      obj.url = menuUrl + $(ele).find('a').attr('href')
      obj.from = '无敌小说网'
      obj.name && list.arr.push(obj)
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
  $('.art_con dd').each(function(i, el) {
    const id = $(el).attr('data-id')
    const list = {
      id: id,
      arr: []
    }
    $(el).find('p').each(function(i, ele) {
      const obj = {}
      obj.name = $(ele).text()
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
      list.push(ite.name)
    })
  })
  detail.title = $('.art_box .neirong h2').text()
  detail.form = '无敌小说网'
  detail.detail = list
  detail.previewUrl = $('.zjqh .syz a').attr('href').indexOf('.html') != -1 ? $('.zjqh .mulu a').attr('href') + $('.zjqh .syz a').attr('href') : ''
  detail.nextUrl = $('.zjqh .xyz a').attr('href').indexOf('.html') != -1 ? $('.zjqh .mulu a').attr('href') + $('.zjqh .xyz a').attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
