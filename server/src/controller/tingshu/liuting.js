/**
 * create by zhangxiang on 2022-04-10 16:07
 * 类注释：六六听网
 * 备注：
 */
const Http = require('../../http/liuting')
const cheerio = require('cheerio')
const qs = require('qs')

const search = async(name) => {
  const res = await Http.post('/search.php', qs.stringify({ searchword: name }))
  console.log(res)
  const $ = cheerio.load(res.toString())
  const bookArr = []
  $('.list-unstyled li').each(function(i, el) {
    const book = {}
    book.menuUrl = $(el).find('h4 a').attr('href')
    book.name = $(el).find('h4 a').text()
    book.from = '六六听网'
    book.author = $(el).find('h6 a').text()
    book.imgUrl = 'http://www.6ting.cn' + $(el).find('.img-responsive').attr('src')
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
  info.imgUrl = 'http://www.6ting.cn' + $('.container .row .list-unstyled img').attr('src')
  info.name = $('.container .row .page-header h5 a').eq(2).text()
  info.author = $('.container .row .list-unstyled .col-xs-8 dl dd').eq(1).text()
  info.disc = $('.container .row .list-unstyled .col-xs-8 dl dd').eq(5).text()
  info.status = $('.container .row .list-unstyled .col-xs-8 dl dd').eq(3).text()
  info.type = $('.container .row .list-unstyled .col-xs-8 dl dd').first().text()
  $('.tab-content #playlist1 ul li').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = $(el).find('a').attr('href')
    obj.from = '六六听网'
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
  let $ = cheerio.load(res.toString())
  const detail = {}
  detail.title = $('.container .row .page-header h4 a').last().text()
  detail.from = '六六听网'
  detail.previewUrl = $('.ting-player button').eq(3).find('a').attr('href')
  detail.nextUrl = $('.ting-player button').eq(5).find('a').attr('href')
  detailUrl = $('.ting-player iframe').attr('src')
  console.log(detailUrl)
  res = await Http.get(encodeURI(detailUrl))
  $ = cheerio.load(res.toString())
  // const matchNow = res.match(/url:(.*),/)
  // console.log(matchNow[1])
  $('script').map(function(i, el) {
    if (i === 4) {
      const text = $(this)[0].children[0].data
      detail.url = text.split(',url:')[1].split(',cover:')[0].replace(/'/g, '').trim()
    }
  })
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
