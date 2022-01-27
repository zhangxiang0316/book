const router = require('koa-router')()
const {
  search,
  getMenuList,
  getBookDetail
} = require('../controller/tingshu/liuyue')

router.prefix('/liuyue')

router.get('/search', async(ctx, next) => {
  ctx.body = await search(ctx.query.name)
})

router.get('/menuList', async(ctx, next) => {
  ctx.body = await getMenuList(ctx.query.bookUrl)
})

router.get('/detail', async(ctx, next) => {
  ctx.body = await getBookDetail(ctx.query.detailUrl)
})

module.exports = router
