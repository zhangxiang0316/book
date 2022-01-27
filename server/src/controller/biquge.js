const Http = require('../http/biquge')
const cheerio = require('cheerio')

/**
 * 根据名称作者查询图书
 * @param name
 * @returns {Promise<*[]>}
 */
const search = async(name) => {
  const res = await Http.get(`/s?q=${encodeURI(name)}`)
  const $ = cheerio.load(res)
  const bookArr = []
  $('.bookinfo', '.box').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.author = $(el).find('div')[0].children[0].data
    obj.from = '笔趣阁'
    bookArr.push(obj)
  })
  $('.bookimg', '.box').each(function(i, el) {
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
  info.imgUrl = $('.info .cover img').attr('src')
  info.name = $('.info h1').text()
  info.disc = $('.info .intro dl dd').text()
  $('.info .small span').each(function(i, el) {
    if (i === 0) { info.author = $(el).text() }
    if (i === 1) { info.status = $(el).text() }
    if (i === 2) { info.updataTime = $(el).text() }
    if (i === 3) {
      info.last = {
        url: $(el).find('a').attr('href'),
        from: '笔趣阁',
        name: $(el).find('a').text()
      }
    }
  })
  $('.listmain dl dd').each(function(i, el) {
    const obj = {}
    if ($(el).find('a').attr('href').indexOf('javascript') == -1) {
      obj.url = $(el).find('a').attr('href')
      obj.name = $(el).find('a').text()
      obj.from = '笔趣阁'
      arr.push(obj)
    }
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
  $('#chaptercontent').html().split('<br><br>').map(item => {
    if (item.indexOf('<p') == -1) { arr.push(item.trim()) }
  })
  detail.title = $('.title', '.header_wap').text()
  detail.form = '笔趣阁'
  detail.detail = arr
  $('script').map(function(i, el) {
    if (i === 3) {
      const text = $(this)[0].children[0].data
      const matchNext = text.match(/var next_page = (.*);/)
      const nextPage = matchNext[1].replace('"', '').replace('"', '')
      const matchPreview = text.match(/var preview_page = (.*);/)
      const previewPage = matchPreview[1].replace('"', '').replace('"', '')
      detail.nextUrl = nextPage.indexOf('.html') === -1 ? '' : nextPage
      detail.previewUrl = previewPage.indexOf('.html') === -1 ? '' : previewPage
    }
  })
  return detail
}

/**
 * 获取笔趣阁首页内容
 * @returns {Promise<{top: {name: string, list: *[]}, block: {name: string, list: *[]}, hot: {name: string, list: *[]}}>}
 */
const getHome = async() => {
  const res = await Http.get('')
  const $ = cheerio.load(res)
  const detail = {
    hot: { name: '热门图书', list: [] },
    top: { name: '强力推荐', list: [] },
    block: { name: '分类查看', list: [] }
  }
  $('.hot .item').each(function(i, el) {
    const hot = {}
    const html = $(el)
    hot.menuUrl = html.find('a').attr('href')
    hot.disc = html.find('dl dd').text()
    hot.author = html.find('span').text()
    hot.name = html.find('a').text()
    hot.imgUrl = html.find('img').attr('src')
    hot.from = '笔趣阁'
    detail.hot.list.push(hot)
  })
  $('.top .lis li').each(function(i, el) {
    const top = {}
    const html = $(el)
    top.type = html.find('.s1').text()
    top.name = html.find('a').text()
    top.menuUrl = html.find('a').attr('href')
    top.author = html.find('.s5').text()
    top.from = '笔趣阁'
    detail.top.list.push(top)
  })
  $('.wrap .type .block').each(function(i, el) {
    const block = {
      list: [],
      name: ''
    }
    block.name = $(el).find('h2').text()
    const first = {}
    first.name = $(el).find('.block_top dl a').text()
    first.menuUrl = $(el).find('.block_top dl a').attr('href')
    first.disc = $(el).find('.block_top dd').text()
    first.imgUrl = $(el).find('.block_top .image img').attr('src')
    first.from = '笔趣阁'
    block.list.push(first)
    $(el).find('.lis li').each(function(j, e) {
      const obj = {}
      const html = $(e)
      obj.name = html.find('.s2').text()
      obj.menuUrl = html.find('.s2 a').attr('href')
      obj.type = html.find('.s1').text()
      obj.author = html.find('.s3').text()
      obj.from = '笔趣阁'
      block.list.push(obj)
    })
    detail.block.list.push(block)
  })
  return detail
}

/**
 * 根据类型获取 分类列表
 * @param page
 * @param sortid
 */
const getBookListByType = async(page, sortid) => {
  const res = await Http.get('/json', { params: { page, sortid }})
  const list = res.map(item => {
    const obj = {}
    obj.menuUrl = item.url_list
    obj.name = item.articlename
    obj.author = item.author
    obj.imgUrl = item.url_img
    obj.from = '笔趣阁'
    return obj
  })
  return list
}

/**
 * 获取TOP50
 * @returns {Promise<unknown>}
 */
const getTopFifty = async() => {
  const res = await Http.get('/top/')
  const $ = cheerio.load(res)
  const arr = []
  $('.blocks').each(function(i, el) {
    const obj = {
      list: []
    }
    obj.name = $(el).find('h2').text()
    $(el).find('li').each(function(j, ele) {
      const obj1 = {}
      obj1.menuUrl = $(ele).find('a').attr('href')
      obj1.name = $(ele).find('a').text()
      obj1.author = $(ele).text().split('/')[1]
      obj1.from = '笔趣阁'
      obj.list.push(obj1)
    })
    arr.push(obj)
  })
  return arr
}

module.exports = {
  search,
  getMenuList,
  getBookDetail,
  getHome,
  getBookListByType,
  getTopFifty
}
