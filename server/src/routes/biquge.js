const router = require('koa-router')()
const { getHome, getBookListByType, getTopFifty } = require('../controller/biquge')

router.prefix('/biquge')

router.get('/home', async(ctx, next) => {
  ctx.body = await getHome()
})

router.get('/bookListByType', async(ctx, next) => {
  ctx.body = await getBookListByType(ctx.query.page, ctx.query.sortid)
})
router.get('/top', async(ctx, next) => {
  ctx.body = await getTopFifty()
})

module.exports = router
