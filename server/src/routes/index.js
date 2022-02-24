const router = require('koa-router')()

const biquge = require('../controller/biquge')
const xbiquge = require('../controller/xbiquge')
const xihongshi = require('../controller/xihongshi')
const wudi = require('../controller/wudi')
const fanqie = require('../controller/fanqie')
const yongsheng = require('../controller/yongsheng')
const xbiqupao = require('../controller/xbiqupao')
const biququ = require('../controller/biququ')
const bayi = require('../controller/bayi')
const danshu = require('../controller/danshu')
const sanz = require('../controller/sanz')
const moyuan = require('../controller/moyuan')
const biquwang = require('../controller/biquwang')
const niaoshu = require('../controller/niaoshu')
const lingling = require('../controller/lingling')
const qiwu = require('../controller/qiwu')
const souxiaoshuo = require('../controller/souxiaoshuo')
const youjiu = require('../controller/youjiu')
const miaobige = require('../controller/miaobige')
const qianqian = require('../controller/qianqian')
const quanben = require('../controller/quanben')
const weifeng = require('../controller/weifeng')
const jiutao = require('../controller/jiutao')
const heiyan = require('../controller/heiyan')
const yanqing = require('../controller/yanqing')
const lewen = require('../controller/lewen')
const siluke = require('../controller/siluke')
const shubenwang = require('../controller/shubenwang')

const bookArr = {
  '笔趣阁': biquge,
  '新笔趣阁': xbiquge,
  '西红柿': xihongshi,
  '无敌小说网': wudi,
  '番茄小说': fanqie,
  '永生文学': yongsheng,
  '笔趣泡': xbiqupao,
  '笔趣趣': biququ,
  '八一小说': bayi,
  '丹书铁卷': danshu,
  '3z小说': sanz,
  '墨缘文学': moyuan,
  '笔趣网': biquwang,
  '鸟书网': niaoshu,
  '00小说': lingling,
  '起舞小说': qiwu,
  '搜小说': souxiaoshuo,
  '悠久小说': youjiu,
  '妙笔阁': miaobige,
  '千千小说': qianqian,
  '全本小说': quanben,
  '微风小说': weifeng,
  '九桃小说': jiutao,
  '黑岩小说': heiyan,
  '乐文小说': lewen,
  '言情中文': yanqing,
  '思路客': siluke,
  '书本网': shubenwang
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
router.get('/getMenuList', async(ctx, next) => {
  const { bookUrl, type } = ctx.query
  let menuDetail = {}
  if (!bookUrl) {
    return menuDetail
  }
  menuDetail = await bookArr[type].getMenuList(ctx.query.bookUrl)
  ctx.body = menuDetail
})

/**
 * 获取详情
 */
router.get('/getBookDetail', async(ctx, next) => {
  const { detailUrl, type } = ctx.query
  let bookDetail = {}
  if (!detailUrl) {
    return bookDetail
  }
  bookDetail = await bookArr[type].getBookDetail(detailUrl)
  ctx.body = bookDetail
})

module.exports = router
