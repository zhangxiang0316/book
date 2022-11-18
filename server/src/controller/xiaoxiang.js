/**
 * create by zhangxiang on 2021-12-12 20:39
 * 类注释：潇湘书院
 * 备注：
 */
const Http = require('../http/xiaoxiang')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const axios = require('axios')

const setFile = (bookName, detailName) => {
  if (fs.existsSync('E:/book/' + bookName)) {
  } else {
    fs.mkdirSync('E:/book/' + bookName)
  }
  return path.resolve(__dirname, `E:/book/${bookName}/${detailName}`)
}

const getFile = async() => {
  const file = fs.readFileSync(path.resolve(__dirname, './xbiquge.js'))
  return file.toString()
}

/**
 * 根据名称作者查询图书
 * @param name
 * @returns {Promise<*[]>}
 */
const search = async() => {
  const res = await Http.get(`/`)
  const $ = cheerio.load(res)
  const bookList = []
  // $('.ullist li').each(function (i, el) {
  //     getMenuList($(el).find('a').attr('href'), $(el).find('a').text())
  //     bookList.push({name: $(el).find('a').text(), url: $(el).find('a').attr('href')})
  // })
  $('.ulhover li').each(function(i, el) {
    getMenuList($(el).find('span a').attr('href'), $(el).find('a').text())
    bookList.push({ name: $(el).find('span a').text(), url: $(el).find('a').attr('href') })
  })
}

const getMenuList = async(bookUrl, bookName) => {
  const res = await Http.get(bookUrl)
  const $ = cheerio.load(res)
  const menuList = []
  // $('.ullist li').each(function (i, el) {
  //     getBookDetail($(el).find('a').attr('href'), bookName)
  //     menuList.push({menuUrl: $(el).find('a').attr('href'), name: $(el).find('a').text()})
  // })
  $('.infoindex dd').each(function(i, el) {
    getBookDetail($(el).find('a').attr('href'), bookName)
    menuList.push({ menuUrl: $(el).find('a').attr('href'), name: $(el).find('a').text() })
  })
}

const getBookDetail = async(detailUrl, bookName) => {
  const res = await Http.get(detailUrl)
  const $ = cheerio.load(res)
  const detailList = []
  try {
    $('#acontent').html().split('<br>').map(item => {
      item.toString().replace(/\n/g, '') && detailList.push(item.toString().trim().replace(/\n/g, ''))
    })
  } catch (e) {
    console.log(res)
    console.log(e)
  }
  const zhang = $('.atitle').text()
  fs.writeFile(setFile(bookName, `${zhang}.txt`), detailList.join(''), function(err) {
    console.log(err)
  })
}

const bookDetail = (id) => {
  axios.get(`https://yazhouse8.com/article/1.html`).then(res => {
    console.log(res)
  }).catch(e => {
    console.log('eeeee:', e)
  })
  // console.log(res)
  // const detailList = []
  // const $ = cheerio.load(res)
  // $('.content').html().split('<br>').map(item => {
  //   item.toString().replace(/\n/g, '') && detailList.push(item.toString().trim().replace(/\n/g, ''))
  // })
  // console.log(detailList)
}

bookDetail(1 + '')

// module.exports = {
//   search,
//   getFile
// }
