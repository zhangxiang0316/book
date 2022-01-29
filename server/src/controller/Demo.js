const cheerio = require('cheerio')
const axios = require('axios')
const miaobige = require('../conf/miaobige.json')

const search = async(key) => {
  let url = ''
  let res = ''
  if (miaobige.search.url.indexOf('@post') !== -1) {
    url = miaobige.search.url.split('@post')[0]
    const params = miaobige.search.url.split('@post->')[1]
    // eslint-disable-next-line no-eval
    res = await axios.post(url, eval('`' + params + '`'))
  } else {
    url = miaobige.search.url
    key = encodeURI(key)
    // eslint-disable-next-line no-eval
    res = await axios.get(eval('`' + url + '`'))
  }
  const $ = cheerio.load(res.data.toString())
  const bookArr = []
  console.log(miaobige.search.list)
  $(miaobige.search.list).each(function(i, el) {
    const obj = {}
    obj.menuUrl = $(el).find(miaobige.search.detail).attr('href')
    obj.name = $(el).find(miaobige.search.name).text()
    obj.author = $(el).find(miaobige.search.author).text()
    obj.from = miaobige.name
    obj.summary = $(el).find(miaobige.search.summary).text()
    obj.imgUrl = $(el).find(miaobige.search.cover).attr('src')
    bookArr.push(obj)
  })
  return bookArr
}

const getMenuList = async(menuUrl) => {
  let data = await axios.get(menuUrl)
  let $ = cheerio.load(data.data.toString())
  const bookDetail = {}
  const info = {}
  for (const name in miaobige.detail) {
    if (name !== 'catalog') {
      if (miaobige.detail[name].indexOf('@attr->') !== -1) {
        info[name] = $(miaobige.detail[name].split('@attr->')[0]).attr(miaobige.detail[name].split('@attr->')[1])
      } else {
        info[name] = $(miaobige.detail[name]).text()
      }
    } else {
      info.catalog = 'https://' + miaobige.url + $(miaobige.detail.catalog).attr('href')
    }
  }
  if (info.catalog) {
    data = await axios.get(info.catalog)
    $ = cheerio.load(data.data.toString())
  }
  const arr = []
  $(miaobige.catalog.list + '>' + miaobige.catalog.booklet.list).each(function(i, el) {
    const obj = {}
    obj.url = $(el).find(miaobige.catalog.chapter).attr('href')
    obj.name = $(el).find(miaobige.catalog.name).text()
    obj.from = miaobige.name
    arr.push(obj)
  })
  bookDetail.info = info
  bookDetail.list = arr
  return bookDetail
}

const getBookDetail = async(detailUrl) => {
  const res = await axios.get(detailUrl)
  const $ = cheerio.load(res.data.toString())
  const detail = {}
  const arr = []
  $(miaobige.chapter.content).each(function(i, el) {
    arr.push($(el).text())
  })
  detail.title = $(miaobige.detail.name).text()
  detail.author = $(miaobige.detail.author).text()
  detail.cover = $(miaobige.detail.cover).text()
  detail.summary = $(miaobige.detail.summary).text()
  detail.status = $(miaobige.detail.status).text()
  detail.update = $(miaobige.detail.update).text()
  detail.lastChapter = $(miaobige.detail.lastChapter).text()
  detail.form = miaobige.name
  detail.detail = arr
  return detail
}

module.exports = {
  search,
  getMenuList,
  getBookDetail
}
