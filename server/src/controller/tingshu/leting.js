/**
 * create by zhangxiang on 2022-01-23 16:44
 * 类注释：乐听吧
 * 备注：
 */

const Http = require('../../http/leting')
const cheerio = require('cheerio')

const search = async(name) => {
  const res = await Http.get(`/search.php?searchword=${encodeURI(name)}`)
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.tx-box .row3 .col-12').each(function(i, el) {
    const book = {}
    book.menuUrl = $(el).find('.style-img .img-80').attr('href')
    book.name = $(el).find('.style-img .style-title a').text()
    book.from = '乐听吧'
    book.author = $(el).find('.style-img .style-title .f-gray').text() + $(el).find('.detail p').eq(1).text()
    book.imgUrl = 'https://www.leting8.com' + $(el).find('.style-img .img-80 img').attr('src')
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
  info.imgUrl = 'https://www.leting8.com' + $('.tx-box .style-img .img-100 .img-box img').attr('src')
  info.name = $('.tx-box .style-img section h1').text()
  info.author = $('.tx-box .style-img .f-gray').eq(1).text()
  info.disc = $('.tx-box .style-img .f-gray').last().text()
  info.status = '状态:' + '暂无'
  info.type = ''
  $('#yuedu ul li').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = $(el).find('a').attr('href')
    obj.from = '乐听吧'
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
  const $ = cheerio.load(res.toString())
  const detail = {}
  detail.title = $('#txtbox1 .info-title h1').text()
  detail.from = '乐听吧'
  $(' #txtbox1 #txtbox script').map(function(i, el) {
    if (i == 0) {
      const text = $(this)[0].children[0].data
      console.log('11', text)
      const matchNow = text.match(/var now=(.*);/)
      console.log('222', matchNow)
      const url = eval(matchNow[1].split(';')[0])
      detail.url = url
      const matchPreview = text.match(/var prePage=(.*);/)
      const previewUrl = eval(matchPreview[1].split(';')[0])
      detail.previewUrl = previewUrl
      const matchNextUrl = text.match(/var nextPage=(.*);/)
      const nextUrl = eval(matchNextUrl[1].split(';')[0])
      detail.nextUrl = nextUrl
    }
  })
  return detail
}

function unescape(str) {
  return decodeURIComponent(str)
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
