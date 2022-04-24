import Vue from 'vue'
import Vuex from './rare-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    double(state) {
      return state.count * 2
    }
  },
  mutations: {
    add(state) {
      state.count++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  }
})
