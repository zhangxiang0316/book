/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：言情中文
 * 备注：
 */
const Http = require('../http/yanqing')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const gbk = require('../utils/gbk')

const search = async(name) => {
  let res = await Http.get(`/modules/article/search.php?searchkey=${gbk.encode(name)}`, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const bookArr = []
  // 只搜索到一本 返回为小说章节信息
  if ($('.box_con').find('#list').length > 0) {
    const obj = {}
    obj.menuUrl = $('link').first().attr('href')
    obj.imgUrl = $('#maininfo #fmimg img').attr('src')
    obj.name = $('#maininfo #info h1').text()
    obj.author = $('#maininfo #info p').first().find('a').text()
    obj.from = '言情中文'
    bookArr.push(obj)
  } else {
    $('#main .novelslistss li').each(function(i, el) {
      const obj = {}
      obj.menuUrl = $(el).find('.s2 a').attr('href')
      obj.name = $(el).find('.s2 a').text()
      obj.author = $(el).find('.s4').text()
      obj.from = '言情中文'
      obj.imgUrl = ''
      bookArr.push(obj)
    })
  }
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
  data = iconv.decode(Buffer.from(data), 'gbk')
  const $ = cheerio.load(data)
  info.imgUrl = $('#maininfo #fmimg img').attr('src')
  info.name = $('#maininfo #info h1').text()
  info.author = $('#maininfo #info p').first().find('a').text()
  info.disc = $('#maininfo #info #intro').text()
  info.updataTime = $('#maininfo #info p').eq(2).text()
  info.status = '暂无'
  info.last = {
    url: menuUrl + $('#maininfo #info p').eq(3).find('a').attr('href'),
    from: '言情中文',
    name: $('#maininfo #info p').eq(3).find('a').text()
  }
  $('#list dl dd').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = menuUrl + $(el).find('a').attr('href')
    obj.from = '言情中文'
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
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const detail = {}
  const arr = []
  $('#content').html().split('<br>').map(item => {
    const line = item.replace(/&nbsp;/g, '').toString().trim()
    line && line.indexOf('<a') == -1 && arr.push(line)
  })
  detail.title = $('.bookname h1').text()
  detail.form = '言情中文'
  detail.detail = arr
  detail.previewUrl = $('.bottem a').eq(1).attr('href').indexOf('.html') != -1 ? $('.bottem a').eq(1).attr('href') : ''
  detail.nextUrl = $('.bottem a').eq(3).attr('href').indexOf('.html') != -1 ? $('.bottem a').eq(3).attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
