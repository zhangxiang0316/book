/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：听书
 * 备注：
 */
const Http = require('../http/tingshubao')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const gbk = require('../utils/gbk')
const { getAspParas, FonHen_JieMa } = require('../utils/ting')

const search = async(name) => {
  let res = await Http.get(`/search.asp?searchword=${gbk.encode(name)}`, { responseType: 'arraybuffer' })
  // let res = await Http.post(`/search.asp`, qs.stringify({searchword: gbk.encode(name)}), {responseType: "arraybuffer"})
  res = iconv.decode(Buffer.from(res), 'gb2312')
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.book-ol .book-li').each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find(' a').attr('href')
    obj.from = '听书宝'
    obj.name = $(el).find('.book-cell .book-title').text()
    obj.author = $(el).find('.book-cell .book-meta').text()
    obj.imgUrl = 'http://m.tingshubao.com' + $(el).find('.book-cover').attr('data-original')
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
  let data = await Http.get(menuUrl, { responseType: 'arraybuffer' })
  data = iconv.decode(Buffer.from(data), 'gb2312')
  const $ = cheerio.load(data)
  info.imgUrl = 'http://m.tingshubao.com' + $('.book .book-cover').attr('src')
  info.name = $('.book .book-cell .book-title').text()
  info.author = $('.book .book-des p').text()
  info.disc = $('.book .book-des').text()
  info.status = $('.book .book-cell .book-rand-a').last().text()
  info.type = $('.book .book-cell .book-rand-a').first().text()
  $('.play-list ul li').each(function(i, el) {
    const obj = {}
    obj.from = '听书宝'
    obj.name = $(el).find('a').text()
    obj.url = $(el).find('a').attr('href')
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
  let res = await Http.get(detailUrl, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gb2312')
  const $ = cheerio.load(res.toString())
  let bookDetail = []
  const detail = {}
  detail.title = $('.module .module-title-h2').text()
  $('script').map(function(i, el) {
    if (i === 4) {
      const text = $(this)[0].children[0].data.split('var datas=(FonHen_JieMa(\'')[1].split('\').split(\'&\'))')[0]
      bookDetail = FonHen_JieMa(text).split('&')
    }
  })
  if (bookDetail[2] === 'tudou') {

  } else if (bookDetail[2] === 'tc') {
    // const res = await Http.get('https://www.gushiciju.com/player/key.php', {params: {url: bookDetail[0]}})
    const res = await Http.get('http://43.129.176.64/player/key.php', { params: { url: bookDetail[0] }})
    detail.url = res.url
  } else {
    detail.url = bookDetail[0]
  }
  const page = getAspParas('.html', 'http://m.tingshubao.com' + detailUrl, detailUrl)
  const next = parseInt(page[2]) + 1
  const preview = parseInt(page[2]) - 1
  detail.nextUrl = '/' + page[0] + '-' + page[1] + '-' + next + '.html'
  detail.from = '听书宝'
  detail.previewUrl = preview >= 0 ? '/' + page[0] + '-' + page[1] + '-' + preview + '.html' : ''
  return detail
}

/**
 * 获取首页
 * @returns {Promise<{updateBook: {}, newBook: {}, list: *[]}>}
 */
const getHome = async() => {
  let res = await Http.get('', { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gb2312')
  const $ = cheerio.load(res.toString())
  const homeDetail = {
    list: [],
    newBook: {},
    updateBook: {}
  }
  $('.list').each(function(i, el) {
    const item = {}
    const list = []
    item.title = $(el).find('.list-title .module-title-h').text()
    $(el).find('ul li').each(function(j, ele) {
      list.push({
        from: '听书宝',
        menuUrl: $(ele).find(' a').attr('href'),
        name: $(ele).find('.list-name').text(),
        author: $(ele).find('.module-slide-author').text(),
        imgUrl: 'http://m.tingshubao.com' + $(ele).find('.list-img').attr('data-original')
      })
    })
    item.list = list
    homeDetail.list.push(item)
  })

  // 新上架
  const firstItem = {}
  const firstList = []
  firstItem.title = '上架新书'
  $('.module').first().find('.book-ol .book-li').each(function(i, el) {
    firstList.push({
      menuUrl: $(el).find(' a').attr('href'),
      from: '听书宝',
      name: $(el).find('.book-cell .book-title').text(),
      author: $(el).find('.book-cell .book-meta').text(),
      disc: $(el).find('.book-cell .book-desc').text(),
      imgUrl: 'http://m.tingshubao.com' + $(el).find('.book-cover').attr('data-original')
    })
  })
  firstItem.list = firstList
  homeDetail.newBook = firstItem

  // 最近更新
  const updateItem = {}
  const updateList = []
  updateItem.title = '最近更新'
  $('.module').last().find('.book-list li').each(function(i, el) {
    updateList.push({
      menuUrl: $(el).find('.book-list-tit a').attr('href'),
      name: $(el).find('.book-list-tit .name').text(),
      type: $(el).find('.type').text(),
      from: '听书宝',
      updateName: $(el).find('.book-list-tit .chapter').text() ? $(el).find('.book-list-tit .chapter').text() : '（全本小说）',
      imgUrl: ''
    })
  })
  updateItem.list = updateList
  homeDetail.updateBook = updateItem
  return homeDetail
}

const getTypeList = async(typeUrl) => {
  let res = await Http.get(typeUrl, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gb2312')
  const $ = cheerio.load(res.toString())
  const list = []
  $('.list-ul .list-li').each(function(i, el) {
    list.push({
      menuUrl: $(el).find('.list-name a').attr('href'),
      name: $(el).find('.list-name a').text(),
      from: '听书宝',
      author: $(el).find('.module-slide-author').text(),
      imgUrl: 'http://m.tingshubao.com' + $(el).find('a .list-img').attr('data-original')
    })
  })
  return list
}

const getBookTypeList = async(url) => {
  let res = await Http.get(url, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gb2312')
  const $ = cheerio.load(res.toString())
  const detail = {}
  const list = []
  detail.new = $('.module .option a').first().attr('href')
  detail.hot = $('.module .option a').last().attr('href')
  $('.book-ol .book-li').each(function(i, el) {
    list.push({
      from: '听书宝',
      menuUrl: $(el).find('a').attr('href'),
      name: $(el).find('.book-cell .book-title').text(),
      disc: $(el).find('.book-cell .book-desc').text(),
      author: $(el).find('.book-meta').text(),
      imgUrl: 'http://m.tingshubao.com' + $(el).find('a .book-cover').attr('data-original')
    })
  })
  detail.nextPage = $('.paging .next').attr('href')
  detail.previewPage = $('.paging .previous').attr('href')
  detail.list = list
  return detail
}

const getPingShuList = async(typeUrl) => {
  let res = await Http.get(typeUrl, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gb2312')
  const $ = cheerio.load(res.toString())
  const list = []
  $('.list-ul .list-li').each(function(i, el) {
    list.push({
      from: '听书宝',
      menuUrl: $(el).find('a').attr('href'),
      name: $(el).find('.list-name').text(),
      author: $(el).find('.module-slide-author').text(),
      imgUrl: 'http://m.tingshubao.com' + $(el).find('a .list-img').attr('data-original')
    })
  })
  return list
}

module.exports = {
  search,
  getMenuList,
  getBookDetail,
  getHome,
  getTypeList,
  getBookTypeList,
  getPingShuList
}
