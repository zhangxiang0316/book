/**
 * create by zhangxiang on 2021-12-12 20:39
 * 类注释：潇湘书院
 * 备注：
 */
const router = require('koa-router')()
const { search, getMenuList, getBookDetail } = require('../controller/Demo')

router.get('/xiaoxiang/search', async(ctx, next) => {
  ctx.body = await search(ctx.query.name)
})
router.get('/xiaoxiang/menuList', async(ctx, next) => {
  ctx.body = await getMenuList(ctx.query.bookUrl)
})
router.get('/xiaoxiang/detail', async(ctx, next) => {
  ctx.body = await getBookDetail(ctx.query.detailUrl)
})

module.exports = router
