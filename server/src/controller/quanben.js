/**
 * create by zhangxiang on 2021-12-16 20:59
 * 类注释：全本小说网
 * 备注：
 */
const Http = require('../http/quanben')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const gbk = require('../utils/gbk')

const search = async(name) => {
  let res = await Http.get(`/modules/article/search.php?searchkey=${gbk.encode(name)}&submit=%CB%D1%CB%F7`, { responseType: 'arraybuffer' })
  res = iconv.decode(Buffer.from(res), 'gbk')
  const $ = cheerio.load(res.toString())
  const bookArr = []
  // 只搜索到一本 返回为小说章节信息
  if ($('.zjbox').find('.zjlist').length > 0) {
    const obj = {}
    obj.menuUrl = $('link').first().attr('href')
    obj.imgUrl = $('#bookdetail #picbox .img_in img').attr('src')
    obj.name = $('#bookdetail #picbox .img_in img').attr('alt')
    obj.author = $('#bookdetail #info h1 small a').text()
    obj.from = '全本小说'
    bookArr.push(obj)
  } else {
    $('#main .grid tr').each(function(i, el) {
      if (i > 0) {
        const obj = {}
        obj.menuUrl = $(el).find('.odd a').attr('href')
        obj.name = $(el).find('.odd a').text()
        obj.author = $(el).find('.odd').first().next().next().text()
        obj.from = '全本小说'
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
  info.imgUrl = $('#bookdetail #picbox .img_in img').attr('src')
  info.name = $('#bookdetail #picbox .img_in img').attr('alt')
  info.author = $('#bookdetail #info h1 small a').text()
  info.disc = $('#bookdetail #intro').text()
  info.updataTime = $('#bookdetail .update').text()
  info.status = '暂无'
  info.last = {
    url: menuUrl + $('#bookdetail .update a').attr('href'),
    from: '全本小说',
    name: $('#bookdetail .update a').text()
  }
  $('.zjbox .zjlist dd').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text()
    obj.url = menuUrl + $(el).find('a').attr('href')
    obj.from = '全本小说'
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
  detail.title = $('#main h1').text()
  detail.form = '全本小说'
  detail.detail = arr
  detail.previewUrl = $('.papgbutton a').first().attr('href').indexOf('.html') != -1 ? $('.papgbutton a').first().attr('href') : ''
  detail.nextUrl = $('.papgbutton a').last().attr('href').indexOf('.html') != -1 ? $('.papgbutton a').last().attr('href') : ''
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
