const state = {
  form: {
    user: '',
    region: ''
  }
}

const mutations = {
  SET_FORM(state, payload) {
    state.form = payload
  }
}
const actions = {
  setForm({ commit }, payload) {
    commit('SET_FORM', payload)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
