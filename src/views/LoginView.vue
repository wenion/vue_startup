<template>
<div class="text-center">
  <main class="form-signin w-100 m-auto bg-white">
    <form>
      <!-- <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
      <h1 class="h3 mb-3 fw-normal">Welcome</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="Username" v-model="username">
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" @keyup.enter="login">
        <label for="floatingPassword">Password</label>
      </div>
      </form>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit" @click="login">Sign in</button>
      <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p> -->
    
  </main>
</div>
</template>


<script setup>
import { ref, computed } from 'vue'

import { useStore } from 'vuex'

const store = useStore()

function setToken(token) {
  store.dispatch('setToken', token)
}

function setUser(data) {
  store.dispatch('setUser', data)
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

// const form = ref(false)

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
  console.log('login')
  console.log(username.value)
  console.log(password.value)
  const form = new FormData();
  form.append("username", username.value);
  form.append("password", password.value);
  // console.log(form)
  // axios.post('http://34.125.129.147:5000/login', form, {

  axios.post('http://34.125.129.147:5000/login', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  //}).then(({data})=> console.log(data)
  }).then(function({data}) {
    console.log("login", data)
    setToken(data.token)
    setUser(data)
    router.push('/user')
  }).catch(function (error) {
    // console.log(error.toJSON());
    if (error.message == "Network Error")
      alert(`Webserver Network Error`)
    else
    {
      console.log('error', error.toJSON());
      alert(`Error Username or Password`)
    }
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
/* #username, input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
} */

/* input[type=submit] { */
/* #loginBtn {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
} */

/* .login {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
} */
.text-center {
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
