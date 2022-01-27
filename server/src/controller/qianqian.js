/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：千千小说
 * 备注：
 */
const Http = require('../http/qianqian')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const gbk = require('../utils/gbk')

const search = async(name) => {
  let res = await Http.get(`/modules/article/search.php?searchkey=${gbk.encode(name)}&submit=%CB%D1%CB%F7`, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const bookArr = []
  // 只搜索到一本 返回为小说章节信息
  if ($('.book_list').find('.chapterlist').length > 0) {
    const obj = {}
    obj.menuUrl = $('link').first().attr('href')
    obj.imgUrl = $('.book_info .pic img').attr('src')
    obj.name = $('.book_info .pic img').attr('alt')
    obj.author = $('.book_info #info h1 small a').text()
    obj.from = '千千小说'
    bookArr.push(obj)
  } else {
    $('.padding .grid tr').each(function(i, el) {
      if (i > 0) {
        const obj = {}
        obj.menuUrl = $(el).find('.odd a').first().attr('href')
        obj.name = $(el).find('.odd a').first().text()
        obj.author = $(el).find('.odd').first().next().next().text()
        obj.from = '千千小说'
        obj.imgUrl = ''
        bookArr.push(obj)
      }
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
  info.imgUrl = $('.book_info .pic img').attr('src')
  info.name = $('.book_info .pic img').attr('alt')
  info.author = $('.book_info #info h1 small a').text()
  info.disc = $('.book_info .bookinfo_intro').text()
  info.updataTime = $('.book_info .update').text()
  info.status = '暂无'
  info.last = {
    url: menuUrl + $('.book_info .update a').attr('href'),
    from: '千千小说',
    name: $('.book_info .update a').text()
  }
  $('.book_list .chapterlist').last().find('li').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = menuUrl + $(el).find('a').attr('href')
    obj.from = '千千小说'
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
  $('#htmlContent').html().split('<br>').map(item => {
    const line = item.replace(/&nbsp;/g, '').toString().trim()
    line && line.indexOf('<a') == -1 && arr.push(line)
  })
  detail.title = $('.nc_l .wrapper_main .h1title').text()
  detail.form = '千千小说'
  detail.detail = arr
  detail.previewUrl = $('.chapter-pages .pager_prev').attr('href').indexOf('.htm') != -1 ? $('.chapter-pages .pager_prev').attr('href') : ''
  detail.nextUrl = $('.chapter-pages .pager_next').attr('href').indexOf('.htm') != -1 ? $('.chapter-pages .pager_next').attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
