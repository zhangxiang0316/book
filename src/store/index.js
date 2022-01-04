import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  render(state) {
    return { ...state }
  },
  reducer: state => {
    console.log('VuexPersistence:state', state)
    return {
      listenNow: false
    }
  }
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings
  },
  plugins: [vuexLocal.plugin]
})

export default store
