import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import Vuex from 'vuex'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import store from './store'
import router from './router'


const store = createStore({
    state() {
      return {
        token: null,
        user: null
      }
    },
    plugins: [createPersistedState()],
    getters: {
      getToken(state) { return state.token },
      getUser(state) { return state.user }
    },
    mutations: {
      setToken(state, payload) {
        state.token = payload
      },
      setUser(state, payload) {
        state.user = payload
      }
    },
    actions: {
      setToken(context, payload) {
        context.commit('setToken', payload);
      },
      setUser(context, payload) {
        context.commit('setUser', payload);
      }
    }
  })


const app = createApp(App)

app.use(router)
// app.use(Vuex)
app.use(store)
app.use(VueAxios, axios)
// app.use(axios)
app.provide('axios', app.config.globalProperties.axios)




app.mount('#app')
