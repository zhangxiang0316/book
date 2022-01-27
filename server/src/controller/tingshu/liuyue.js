/**
 * create by zhangxiang on 2021-12-08 20:06
 * 类注释：六月听书
 * 备注：
 */
const Http = require('../../http/liuyue')
const cheerio = require('cheerio')

const search = async(name) => {
  const res = await Http.get(`/search/index/search?content=${encodeURI(name)}&type=1&pageNum=1&pageSize=10`)
  const bookArr = res.data.content.map(item => {
    const $ = cheerio.load(item.name)
    return {
      name: $.text(),
      author: item.author + ':' + item.broadcaster,
      imgUrl: 'http://img.6yueting.com:20001/' + item.coverUrlLocal,
      menuUrl: '/list/' + item.code
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
  const res = await Http.get(menuUrl)
  const $ = cheerio.load(res.toString())
  info.imgUrl = $('.book-item-top .book-item-img img').attr('src')
  info.name = $('.book-item-top .book-item-r .book-item-name').text()
  info.author = $('.book-item-top .book-item-r .book-item-info a').text()
  info.disc = $('.book-item-r .book-item-desc').text()
  info.status = $('.book-item-top .book-item-r .book-item-name .status-serial').last().text()
  info.type = $('.book-item-r div .book-type').first().text()
  $('.play-list ul li').each(function(i, el) {
    const obj = {}
    obj.name = $(el).find('a').text().toString().replace('/\\n/g', '').replace(/\t/g, '')
    obj.url = $(el).find('a').attr('href')
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
  detail.title = $('.player-wrapper .book-item .book-item-r .episode-name').text()
  const detailArr = detailUrl.split('/')
  res = await Http.get('web/index/video_new', {
    params: {
      code: detailArr[2],
      no: detailArr[3],
      type: 0
    }
  })
  console.log(res.data)
  detail.url = res.data.videoUrl
  res = await Http.get('web/index/video_new', {
    params: {
      code: detailArr[2],
      no: detailArr[3],
      type: 1
    }
  })
  console.log(res.data)
  detail.previewUrl = res.data ? '/' + detailArr[1] + '/' + detailArr[2] + '/' + res.data.no : ''
  res = await Http.get('web/index/video_new', {
    params: {
      code: detailArr[2],
      no: detailArr[3],
      type: 2
    }
  })
  console.log(res.data)
  detail.nextUrl = '/' + detailArr[1] + '/' + detailArr[2] + '/' + res.data.no
  console.log(detail)
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
