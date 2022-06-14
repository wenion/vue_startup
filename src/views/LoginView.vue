<template>
  <div class="login">
    <h2>Sign In</h2>
    <!-- <form action="" method="get" class="form-group"> -->
    <form @submit.prevent="login" class="form-group">
        <!-- <input type="text" name="username" id="username" placeholder="User name" value="user.value.username" required> -->
        <input type="text" name="username" id="username" placeholder="User ID" v-model="username" required>
        <input type="password" name="password" id="password" placeholder="Password" v-model="password" required>
        <!-- <input type="submit" value="Login" @click="getList"> -->
        <input type="submit" id="loginBtn" value="Login">
        
        <!-- <p>Counter: {{ trackCounter }}</p> -->
        <!-- <button @click="setToken">Increment</button> -->
    </form>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'

import { useStore } from 'vuex'

const store = useStore()

function setToken(token) {
  store.dispatch('setToken', token)
}

const trackCounter = computed(() => {
  return store.getters.getToken
})

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// JavaScript Expressions
// {{ number + 1 }}
// {{ ok ? 'YES' : 'NO' }}
// {{ message.split('').reverse().join('') }}
// <div :id="`list-${id}`"></div>


//import { ref, reactive } from 'vue'
// const user = ref([{'username': '', 'password': ''}])
const username = ref('')
const password = ref('')

// import { useStore } from 'vuex'
// const store = useStore()
// count: computed(() => store.state.token),
// function incrementCounter() {
//   this.$store.dispatch('increment', 1)
// }

// const trackCounter = computed(() => {
//   return this.$store.getters.getCounter
// })

// const store = useStore()
// const token = computed(() => store.state.token)
// const setToken = (done) => store.dispatch('setToken', done)



import axios from 'axios'

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

function login() {
  console.log(username.value)
  console.log(password.value)
  const form = new FormData();
  form.append("username", username.value);
  form.append("password", password.value);
  // console.log(form)
  axios.post('http://34.125.129.147:5000/login', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  //}).then(({data})=> console.log(data)
  }).then(function({data}) {
    console.log("token", data.token)
    setToken(data.token)
    router.push('/user')
  }).catch(function (error) {
    // console.log(error.toJSON());
    console.log('error', error.toJSON());
    alert(`Error Username or Password`)
  });
}

const name = ref('Vue.js')
function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}

</script>

<style>
/* @media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */

/* input[type=text], input[type=password] { */
#username, input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* input[type=submit] { */
#loginBtn {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
