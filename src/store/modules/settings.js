const state = {
  backgroundColor: '#fff',
  fontSize: 14,
  lineHeight: 24,
  color: '#333',
  nowLookPage: [], // 阅读历史
  bookFromList: [
    { name: '八一小说', value: 'bayi', show: true },
    { name: '笔趣阁', value: 'biquge', show: true },
    { name: '笔趣趣', value: 'biququ', show: true },
    { name: '丹书铁券', value: 'danshu', show: true },
    { name: '番茄小说', value: 'fanqie', show: true },
    { name: '无敌小说', value: 'wudi', show: true },
    { name: '新笔趣阁', value: 'xbiquge', show: true },
    { name: '新笔趣泡', value: 'xbiqupao', show: true },
    { name: '西红柿', value: 'xihongshi', show: true },
    { name: '永生文学', value: 'yongsheng', show: true },
    { name: '3z小说', value: 'sanz', show: true }
  ],
  isNight: false,
  detailQuery: {}
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

const getters = {
  backgroundColor: state => state.backgroundColor,
  fontSize: state => state.fontSize,
  lineHeight: state => state.lineHeight,
  color: state => state.color,
  nowLookPage: state => state.nowLookPage,
  isNight: state => state.isNight,
  detailQuery: state => state.detailQuery,
  bookFromList: state => state.bookFromList
}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}

