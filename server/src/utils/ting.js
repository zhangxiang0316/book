/**
 * create by zhangxiang on 2021-12-31 20:16
 * 类注释：
 * 备注：
 */

const getAspParas = (suffix, cur_url, urlParas) => {
  console.log(cur_url)
  console.log(urlParas)
  if (cur_url.indexOf('?') > 0) {
    return urlParas.substring(1, urlParas.indexOf(suffix)).split('-')
  } else {
    return cur_url.substring(cur_url.lastIndexOf('/') + 1, cur_url.indexOf(suffix)).split('-')
  }
}

const FonHen_JieMa = (u) => {
  console.log(u)
  const tArr = u.split('*')
  let str = ''
  for (let i = 1, n = tArr.length; i < n; i++) {
    str += String.fromCharCode(tArr[i])
  }
  return str
}

module.exports = {
  getAspParas,
  FonHen_JieMa
}
