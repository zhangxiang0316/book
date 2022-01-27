/**
 * create by zhangxiang on 2022-01-15 14:04
 * 类注释：
 * 备注：
 */

const Http = require('../../http/tingshuwang')
const cheerio = require('cheerio')
const { FonHen_JieMa } = require('../../utils/ting')

const search = async(name) => {
  const res = await Http.get(`/pc/index/search.html?keyword=${encodeURI(name)}`)
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.module-content ul li').each(function(i, el) {
    const book = {}
    book.menuUrl = $(el).find('.yun-link').attr('href')
    book.name = $(el).find('.yun-link .text .name').text()
    book.from = '275听书'
    book.author = $(el).find('.yun-link .text .actor').text()
    book.imgUrl = $(el).find('.yun-link .img img').attr('data-original')
    bookArr.push(book)
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
  const res = await Http.get(menuUrl)
  const $ = cheerio.load(res.toString())
  info.imgUrl = $('#content .detail-pic img').attr('src')
  info.name = $('#content .detail-info .detail-title h1').text()
  info.author = '演播：' + $('#content .detail-info .info .fn-left').first().next().next().find('dd').text() +
        '作者：' + $('#content .detail-info .info .fn-right').first().next().next().find('dd').text()
  info.disc = $('#content .detail-info .info .juqing dd').text()
  info.status = '状态' + $('#content .detail-info .info .fn-left').last().find('dd').text()
  info.type = $('#content .detail-info .info .fn-right').first().text().replace(/\n/g, '')
  $('#stab1 .playul li').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = $(el).find('a').attr('href')
    obj.from = '275听书'
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
  let res = await Http.get(detailUrl)
  const $ = cheerio.load(res.toString())
  const detail = {}
  detail.title = $('#content .content .p-h h1').text()
  detail.from = '275听书'
  detail.previewUrl = $('#content .content .pfq-q #preinfo').attr('href')
  detail.nextUrl = $('#content .content .pfq-q #nexturl').attr('href')
  const url = $('#content #playurl').attr('value')
  res = await Http.get(url)
  detail.url = 'h' + FonHen_JieMa(res.src)
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
