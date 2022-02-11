/**
 * create by zhangxiang on 2022-01-15 14:04
 * 类注释：
 * 备注：
 */

const Http = require('../../http/tingshudao')
const cheerio = require('cheerio')
const { base64_decode } = require('../../utils/huanting')

const search = async(name) => {
  const res = await Http.get(`/search.php?searchword=${encodeURI(name)}`)
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.tx-box ul li').each(function(i, el) {
    const book = {}
    book.menuUrl = $(el).find('.img-80').attr('href')
    book.name = $(el).find('section h2 a').text()
    book.from = '听书岛'
    book.author = $(el).find('section .style-title .f-gray').text()
    book.imgUrl = $(el).find('.img-box img').attr('src')
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
  info.imgUrl = $('.wide .tx-box .style-img .img-100 .img-box img').attr('src')
  info.name = $('.wide .tx-box .style-img section h1').text()
  info.author = $('.wide .tx-box .style-img section .mb10 .mr10 a').text()
  info.disc = $('.wide .tx-box .style-img section p').last().text()
  info.status = '状态' + $('#content .detail-info .info .fn-left').last().find('dd').text()
  info.type = ''
  $('#yuedu .ul-36 li').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = $(el).find('a').attr('href')
    obj.from = '听书岛'
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
  detail.from = '听书岛'
  $(' #txtbox1 #txtbox script').map(function(i, el) {
    if (i === 0) {
      const text = $(this)[0].children[0].data
      console.log('11', text)
      const matchNow = text.match(/var now=(.*);/)
      const url = eval(matchNow[1].split(';')[0])
      detail.url = url
      const matchPreview = text.match(/var prePage=(.*);/)
      const previewUrl = matchPreview[1].split(';')[0].replace(/"/g, '')
      detail.previewUrl = previewUrl
      const matchNextUrl = text.match(/var nextPage=(.*);/)
      const nextUrl = matchNextUrl[1].split(';')[0].replace(/"/g, '')
      detail.nextUrl = nextUrl
    }
  })
  return detail
}

function base64decode(data) {
  return base64_decode(data)
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
