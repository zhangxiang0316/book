const fs = require('fs')
const path = require('path')

const axios = require('axios')
const request = require('request')

// https://cdn.makeapie.cn/uploads/ecg-storage/ec_gallery_thumbnail/albums/xByLjqtaLz.png
const arr = require('./test.json')

arr.forEach((item, index) => {
  const href = `http://oss-chart.ppchart.com/ecg-storage/ec_gallery_thumbnail/${item.cid}.png`
  console.log(href)
  const dirPath = './img'
  const write = fs.createWriteStream(dirPath + '/' + `${item.cid}.png`)
  request.get(href).on('error', function(err) {
    console.log(item + 'œ¬‘ÿ ß∞‹', err)
  }).pipe(write)
})
