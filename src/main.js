import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import { createStore } from 'vuex'
import router from './router'
// import store from './store'
import vuetify from './plugins/vuetify'
import createPersistedState from 'vuex-persistedstate'
import { loadFonts } from './plugins/webfontloader'

const store = createStore({
  state() {
    return {
      token: null,
      user: null,
      // currentPage: 0,
      // p: null,
    }
  },
  plugins: [createPersistedState()],
  getters: {
    getToken(state) { return state.token },
    getUser(state) { return state.user },
    // getCurrentPage(state) { return state.currentPage },
    // getP(state) { return state.p },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    // setCurrentPage(state, payload) {
    //   state.currentPage = payload
    // },
    // setP(state, payload) {
    //   state.p = payload
    // }
  },
  actions: {
    setToken(context, payload) {
      context.commit('setToken', payload);
    },
    setUser(context, payload) {
      context.commit('setUser', payload);
    },
    // setCurrentPage(context, payload) {
    //   context.commit('setCurrentPage', payload);
    // },
    // setP(context, payload) {
    //   context.commit('setP', payload);
    // }
  }
})

// setCurrentPage(0)
loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app')
