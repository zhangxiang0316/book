// const axios = require('axios')
//
// axios.post('https://www.pingshu365.com' + '/path365_' + '444052' + '.html' + new Date().getTime(), {}, {
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
//     'Referer': 'https://www.pingshu365.com/play/444052.html'
//   }
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.error(err)
// })

const axios = require('axios')

const getDetail = (url) => {
  axios.get(encodeURI('http://127.0.0.1:8000/getBookDetail?type=无敌小说网&detailUrl=' + url)).then(res => {
    console.log(res.data.title)
    console.log(res.data.detail)
    setTimeout(() => {
      getDetail(res.data.nextUrl)
    }, 60 * 1000)
  }).catch(err => {
    console.log('============', err)
  })
}

getDetail('/yuedu/458/458393/918042.html')

