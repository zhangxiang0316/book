const axios = require('axios')

axios.post('https://www.pingshu365.com' + '/path365_' + '444052' + '.html' + new Date().getTime(), {}, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Referer': 'https://www.pingshu365.com/play/444052.html'
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})

