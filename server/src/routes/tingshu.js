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
const liuyue = require('../controller/tingshu/liuyue')
const tingshudao = require('../controller/tingshu/tingshudao')
const tiantianpingshu = require('../controller/tingshu/tiantianpingshu')
const yiyeting = require('../controller/tingshu/yiyeting')
const liuting = require('../controller/tingshu/liuting')

router.prefix('/tingshu')

const bookArr = {
  '275听书': tingshuwang,
  '听书宝': tingshubao,
  '幻听网': huanting,
  '乐听吧': leting,
  '听中国': tingzhongguo,
  '天天评书': tiantianpingshu,
  '六月听书': liuyue,
  '听书岛': tingshudao,
  '一夜听书': yiyeting,
  '六六听网': liuting
}

/**
 * 查找
 */
router.get('/search', async(ctx, next) => {
  console.log(ctx)
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
