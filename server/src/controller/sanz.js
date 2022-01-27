/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：3z中文
 * 备注：
 */
const Http = require('../http/sanz')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

const search = async(name) => {
  let res = await Http.get(`/s/${encodeURI(name)}`, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.conter ul').each(function(i, el) {
    if (i > 0) {
      const obj = {}
      obj.menuUrl = $(el).find('.conter1 a').attr('href')
      obj.name = $(el).find('.conter1 a').text()
      obj.author = $(el).find('.conter4').text()
      obj.from = '3z中文'
      obj.imgUrl = ''
      bookArr.push(obj)
    }
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
  data = iconv.decode(Buffer.from(data), 'gbk')
  const $ = cheerio.load(data)
  info.imgUrl = $('.ffw td img').attr('src')
  info.name = $('.tna a').text()
  info.author = $('.ffw .tc').text()
  info.disc = $('.ffw tr td').text()
  info.status = '暂无'
  // info.last = {
  //   url: $('.other .news a').attr('href'),
  //   from: '3z中文',
  //   name: $('.other .news a').text()
  // }
  $('.conter .clc').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = menuUrl + $(el).find('a').attr('href')
    obj.from = '3z中文'
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
  $('#cp_content').html().split('<br>').map(item => {
    item.toString().trim().indexOf('<script') == -1 && arr.push(item.toString().trim())
  })
  detail.title = $('#cps_title h1').text()
  detail.form = '3z中文'
  detail.detail = arr
  detail.previewUrl = $('#pg_bar #prevLink').attr('href').indexOf('.htm') != -1 ? $('#nextLink').attr('href') : ''
  detail.nextUrl = $('#nextLink').attr('href').indexOf('.htm') != -1 ? $('#nextLink').attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
