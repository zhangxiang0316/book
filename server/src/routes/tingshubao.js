const router = require('koa-router')()
const {
  getHome,
  getTypeList,
  getPingShuList,
  getBookTypeList
} = require('../controller/tingshubao')

router.prefix('/tingshubao')

router.get('/home', async(ctx, next) => {
  ctx.body = await getHome()
})

router.get('/typeList', async(ctx, next) => {
  ctx.body = await getTypeList(ctx.query.url)
})

router.get('/bookTypeList', async(ctx, next) => {
  ctx.body = await getBookTypeList(ctx.query.url)
})

router.get('/pingShuList', async(ctx, next) => {
  ctx.body = await getPingShuList(ctx.query.url)
})

module.exports = router
