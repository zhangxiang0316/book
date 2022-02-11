/**
 * create by zhangxiang on 2022-01-23 20:28
 * 类注释：听中国
 * 备注：
 */

const Http = require('../../http/tingzhongguo')
const cheerio = require('cheerio')

const { FonHen_JieMa } = require('../../utils/ting')

const search = async(name) => {
  const res = await Http.get(`/pc/index/search.html?keyword=${encodeURI(name)}`)
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.content .list-works li').each(function(i, el) {
    const book = {}
    book.menuUrl = $(el).find('.list-imgbox a').attr('href')
    book.name = $(el).find('.list-works-dl .list-book-dt a').text()
    book.from = '听中国'
    book.author = $(el).find('.list-works-dl .list-book-cs .book-author').first().text() + ' ' + $(el).find('.list-works-dl .list-book-cs .book-author').eq(1).text()
    book.imgUrl = $(el).find('.list-imgbox .thumb img').attr('data-original')
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
  info.imgUrl = $('.content .book .book-img img').attr('src')
  info.name = $('.content .book .book-info .book-title').text().replace(/\n/g, '')
  info.author = $('.book-info dl dd').eq(2).text().replace(/\n/g, '') + $('.book-info dl dd').eq(3).text().replace(/\n/g, '')
  info.disc = $('.book .div-b').text().replace(/\n/g, '')
  info.status = $('.book-info dl dd').eq(4).text().replace(/\n/g, '')
  info.type = $('.book-info dl dd').eq(1).text().replace(/\n/g, '')
  $('#playlist ul li').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = $(el).find('a').attr('href')
    obj.from = '听中国'
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
  detail.title = $('.content .p-h h1').text()
  detail.from = '听中国'
  detail.previewUrl = $('#preinfo').attr('href')
  detail.nextUrl = $('#nexturl').attr('href')
  const url = $('#playurl').attr('value')
  console.log(url)
  res = await Http.get(url)
  console.log(res)
  detail.url = 'h' + FonHen_JieMa(res.src)
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
