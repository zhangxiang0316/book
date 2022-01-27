/**
 * create by zhangxiang on 2022-01-15 15:15
 * 类注释：
 * 备注：
 */

const router = require('koa-router')()

const tingshuwang = require('../controller/tingshu/tingshuwang')
const leting = require('../controller/tingshu/leting')
const huanting = require('../controller/tingshu/huanting')
const tingzhongguo = require('../controller/tingshu/tingzhongguo')
const tingshubao = require('../controller/tingshubao')

router.prefix('/tingshu')

const bookArr = {
  '275听书': tingshuwang,
  '听书宝': tingshubao,
  '幻听网': huanting,
  '乐听吧': leting,
  '听中国': tingzhongguo
}

/**
 * 查找
 */
router.get('/search', async(ctx, next) => {
  const { name, type } = ctx.query
  let bookList = []
  if (!name) {
    return bookList
  }
  bookList = await bookArr[type].search(name)
  ctx.body = bookList
})

/**
 * 获取章节
 */
router.get('/menuList', async(ctx, next) => {
  const { bookUrl, type } = ctx.query
  let menuDetail = {}
  if (!bookUrl) {
    return menuDetail
  }
  console.log(bookUrl, type)
  menuDetail = await bookArr[type].getMenuList(ctx.query.bookUrl)
  ctx.body = menuDetail
})

/**
 * 获取详情
 */
router.get('/detail', async(ctx, next) => {
  const { detailUrl, type } = ctx.query
  let bookDetail = {}
  if (!detailUrl) {
    return bookDetail
  }
  bookDetail = await bookArr[type].getBookDetail(detailUrl)
  ctx.body = bookDetail
})

module.exports = router
