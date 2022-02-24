const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const {info, error, debug} = require('./src/utils/log4j')
const Kcors = require('kcors')

const index = require('./src/routes/index')
const biquge = require('./src/routes/biquge')
const xiaoxiang = require('./src/routes/xiaoxiang')
const tingshubao = require('./src/routes/tingshubao')
const liuyue = require('./src/routes/liuyue')
const tingshu = require('./src/routes/tingshu')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

// 跨域设置
const corsOptions = {
  'origin': function(ctx) {
    if (!ctx.header.referer) { return 'null' }
    const whiteList = ['http://localhost:8088', 'http://127.0.0.1:8088'] // 可跨域白名单
    const url = ctx.header.referer.substr(0, ctx.header.referer.length - 1)
    if (whiteList.includes(url)) {
      return url // 注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
    }
    return 'http://book.zhangmuchen.top'
  },
  'credentials': true,
  'maxAge': 3600
}
app.use(Kcors(corsOptions))


// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('----time:' + new Date() + '----url:' + decodeURIComponent(ctx.url) + '----ms:' + `${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
  .use(biquge.routes(), biquge.allowedMethods())
  .use(xiaoxiang.routes(), xiaoxiang.allowedMethods())
  .use(tingshubao.routes(), tingshubao.allowedMethods())
  .use(liuyue.routes(), liuyue.allowedMethods())
  .use(tingshu.routes(), tingshu.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.log('错误信息：', err)
})

module.exports = app
