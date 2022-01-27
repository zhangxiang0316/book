/**
 * create by zhangxiang on 2021-12-17 22:18
 * 类注释：墨缘文学
 * 备注：
 */
const Http = require('../http/moyuan')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const gbk = require('../utils/gbk')

/**
 * 根据名称作者查询图书
 * @param name
 * @returns {Promise<*[]>}
 */
const search = async(name) => {
  let res = await Http.get(`/modules/article/search.php?searchkey=${gbk.encode(name)}&submit=%CB%D1%CB%F7`, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.warpper .grid tr').each(function(i, el) {
    if (i > 0) {
      const obj = {}
      obj.menuUrl = $(el).find('.odd').first().find('a').attr('href')
      obj.name = $(el).find('.odd').first().find('a').text()
      obj.author = $(el).find('.odd').eq(1).text()
      obj.from = '墨缘文学'
      obj.imgUrl = ''
      bookArr.push(obj)
    }
  })
  return bookArr
}

/**
 * 获取图书章节
 * @param menuUrl
 * @returns {Promise<{}>}
 */
const getMenuList = async(menuUrl) => {
  let res = await Http.get(menuUrl, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const bookDetail = {}
  const info = {}
  const arr = []
  info.imgUrl = $('#fmimg img').attr('src')
  info.name = $('#maininfo #info h1').text()
  info.disc = $('#maininfo #info #intro').text().replace(/\t/g, '').replace(/\n/g, '').toString().trim()
  info.updataTime = $('#maininfo #info p').eq(2).text()
  info.author = $('#maininfo #info p').first().find('a').text()
  info.status = '暂无'
  $('.mu_contain .mulu_list li').each(function(i, el) {
    const obj = {}
    obj.url = menuUrl + $(el).find('a').attr('href')
    obj.name = $(el).find('a').text()
    obj.from = '墨缘文学'
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
  $('#htmlContent').html().split('<br><br>').map(item => {
    item.toString().trim() && arr.push(item.toString().trim())
  })
  detail.title = $('#content h1').text()
  detail.detail = arr
  detail.from = '墨缘文学'
  detail.previewUrl = $('#link-preview').attr('href').indexOf('.html') != -1 ? $('#link-preview').attr('href') : ''
  detail.nextUrl = $('#link-next').attr('href').indexOf('.html') != -1 ? $('#link-next').attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
