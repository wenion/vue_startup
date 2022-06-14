import { createStore } from 'vuex'
// import { mutations, STORAGE_KEY } from './mutations'
// import actions from './actions'
// import plugins from './plugins'

export default createStore({
  state: {
    // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    token: "abc123"
  },
  // actions,
  // actions: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  // plugins: {}
})