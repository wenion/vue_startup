<template>
  <div class="user">
    <h2>admin</h2>
    <div class="playable-buttons">
      <input id="reset" type="button" value="Update feedback data">
      <input id="download" type="button" value="Download feedback data" @click="downloadData">
      <input id="solution" type="button" value="Start rating" @click="startRanking">
      <input id="logout" type="button" value="Logout" @click="logout">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import { useStore } from 'vuex'
const store = useStore()

function setToken(token) {
  store.dispatch('setToken', token)
}

const token = computed(() => {
  return store.getters.getToken
})

function setFeedback(feedback) {
  store.dispatch('setToken', feedback)
}

const feedback = computed(() => {
  return store.getters.getFeedback
})

import axios from 'axios'

axios.defaults.baseURL = 'http://34.125.129.147:5000'

// // * http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         console.log("config reject", localStorage.token)
//         // * 判断是否存在token，如果存在的话，则每个http header都加上token
//         // * token会在登录之后存储在本地
//         if (localStorage.token) {
//             config.headers["Authorization"]  = `Bearer ${localStorage.token}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

// // * http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         let data = response.data;
//         console.log("reject")
//         // * 正常返回数据
//         if (data.code === 0) {
//             // * 返回data
//             return data
//         }
//         // * 如果code是20103 表示token未认证(后端定义的错误码)
//         // * 跳转到login
//         if (data.code === 20103) {
//             router.replace('/login')
//         }
//         return  Promise.reject(data);
//     },
//     error => {
//         return Promise.reject(error);
//     });

onMounted(() => {
  console.log("on mout", token.value)
  if (token.value =='')
  {
    router.push('/login')
  }
})

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

function startRanking()
{
  console.log(token)
  router.push('/rating/0')
  // axios.get('/get_feedback/0', {
  // axios.get('/get_feedback/0', {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     'x-access-token' : token.value
  //   }
  // //}).then(({data})=> console.log(data)
  // }).then(function({data}) {
  //   console.log(JSON.stringify((data)))
  //   // setToken(data.token)
  //   // setFeedback(JSON.stringify((data)))
  //   // console.log("feedback", feedback)
  //   router.push('/rating/0')
  // }).catch(function (error) {
  //   console.log(error);
  // });
}

function logout()
{
  setToken('')
  router.push('/login')
}

function downloadData()
{
  axios.post('/download', {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'x-access-token' : token.value
    },
    responseType: 'arraybuffer',
  }).then(function({data}) {
    // console.log(data)
    const blob = new Blob([data], {type:'application/pdf'})
    const link = document.createElement('a')
    link.download = "result.json"
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
    
    // router.push('/rating/0')
  }).catch(function (error) {
    console.log(error);
  });
}

function getUser()
{
  // console.log(token)
  axios.get('/user', {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token' : token.value
    }
  }).then(function({data}) {
    console.log(JSON.stringify((data)))
    router.push('/rating/0')
  }).catch(function (error) {
    console.log(error);
  });
}



// export default {
//   data() {
//     return {
//       users: {
//         username: 'admin',
//         password: '123456'
//       }
//     }
//   }
// }
</script>

<style>
.user {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

#reset, #download {
  width: 100%;
  background-color: #8d73fd;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

 #solution {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
 }

 #logout {
  width: 100%;
  background-color: #c00808;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
 }
</style>
