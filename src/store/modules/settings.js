const state = {
  backgroundColor: '#fff',
  fontSize: 14,
  lineHeight: 24,
  color: '#333',
  nowLookPage: [], // 阅读历史
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
  detailQuery: state => state.detailQuery
}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}

