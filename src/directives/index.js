
import longPress from './longPress'

// 自定义指令
const directives = {
  longPress
}
// 这种写法可以批量注册指令
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
      console.log(key, directives[key])
    })
  }
}
