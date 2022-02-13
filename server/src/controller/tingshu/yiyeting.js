/**
 * create by zhangxiang on 2022-02-12 14:52
 * 类注释：听书网
 * 备注：
 */

const Http = require('../../http/yiyeting')
const cheerio = require('cheerio')

const search = async(name) => {
  const res = await Http.get(`/Ms.php?q=${encodeURI(name)}`)
  // const res = await Http.get()
  console.log(res)
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.page-content .card').each(function(i, el) {
    const book = {}
    book.menuUrl = $(el).find('a').attr('href')
    book.name = $(el).find('.con h3').text()
    book.from = '听书网'
    book.author = $(el).find('.con .ent').first().text()
    book.imgUrl = $(el).find('.sumext-pic-con .pic img').attr('src')
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
