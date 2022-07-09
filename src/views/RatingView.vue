<template>
  <div v-if="awesome == 1">
  <main>
    <div class="container py-4">
      <header class="pb-3 mb-4 border-bottom">
        <a class="d-flex align-items-center text-dark text-decoration-none">
          <span class="fs-4">You have been allocated to evaluate the quality of {{feedbacks.length}} feedback samples.</span>
        </a>
      <div class="progress">
        <div class="progress-bar" id="progress" role="progressbar" style="width: 0%;" :aria-valuenow="cur_id" :aria-valuemin="1" :aria-valuemax="feedbacks.length"></div>
      </div>
      </header>

      <div v-if="finish == 0">
        <div class="container-fluid py-3">
          <h5 class="lead">The displayed feedback is about the following assignment:</h5>
          <h5 class="display-10"><b>{{feedbacks[cur_id].assign_name}}</b></h5>
        </div>

      <div class="p-3 mb-3 bg-light rounded-3">
        <p class="p-3">{{feedbacks[cur_id].commenttext}}</p>
      </div>

      <ul class="list-group p-3 bg-light rounded-3" v-for="question in questions" :key="question.id">
        <li class="list-group-item">
          <p>{{question.content}}</p>
          
          <!-- <div class="d-flex align-items-center text-dark text-decoration-none"> -->
            <span class="p-3 mb-3" v-for="star_idx in [1,2,3,4,5]" 
              @mouseover="stars_over(star_idx, question.id)"
              @mouseout="stars_out(star_idx, question.id)"
              @click="set_stars(star_idx, question.id)" >
              <i v-if="star_idx <= star_display[question.id-1]" class="bi bi-star-fill"></i>
              <i v-if="star_idx > star_display[question.id-1]" class="bi bi-star"></i>
            </span>
          <!-- </div> -->
        </li>
      </ul>

      <div class="text-end p-3">
        <button class="btn btn-primary" type="button" @click="submit">Submit</button>
      </div>

      </div>
      <div v-else>
        <div class="container-fluid py-3">
          <h5 class="display-10">You have finished all samples, Thank you!</h5>
        </div>
      </div>

    </div>
  </main>
  </div>
  <div v-if="awesome == 2">
    <main>
      <div class="container py-4">
        <h2 class="container-fluid py-3">You have finished all samples, Thank you!</h2>
      </div>
    </main>
  </div>
  <div v-if="awesome == 0">
    <h2>Loding...</h2>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { is_nullish } from '../../node_modules2/terser/lib/compress/inference';


const star_display = ref([])
const cur_id = ref(0)


const awesome = ref(0)

// const buttonText = ref('Next')

const feedbacks = ref(null)
const questions = ref(null)
const finish = ref(0)
const lastQuestion = ref(false)

import { useStore } from 'vuex'
const store = useStore()


import { useRouter, useRoute } from 'vue-router'
const router = useRouter()


const token = computed(() => {
  return store.getters.getToken
})



import axios from 'axios'
axios.defaults.baseURL = 'http://34.125.129.147:5000'

onMounted(() => {

  axios.get('/get_feedback/0', {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token' : token.value
    }
  //}).then(({data})=> console.log(data)
  }).then(function({data}) {
    feedbacks.value = data.feedback

    console.log("feedbacks>>",feedbacks.value.length)
    // let i = 0
    // for (; i< feedbacks.value.length; i++)
    // {
    //   feedbacks[i].push()
    // }
    questions.value = data.question

    for (let i = 0; i < questions.value.length; i++)
    {
      star_display.value.push(null)
    }

    // console.log("feedbacks", feedbacks.value[0].score);
    console.log("feedbacks22", star_display.value);

    if (feedbacks.value.length == 0)
    {
      awesome.value = 2
    }
    else
    {
      awesome.value = 1
    }
    
  }).catch(function (error) {
    router.push('/login')
    console.log("error", error);
  });


})

function stars_out(star_idx, id)
{
  star_display.value[id -1] = feedbacks.value[cur_id.value].score[id-1]
}

function stars_over(star_idx, id)
{
  // console.log(">>>>",id)
  // console.log(star_idx, id, feedbacks.value[cur_id.value].score[id-1])
  
  star_display.value[id - 1] = star_idx
  // feedbacks.value[cur_id.value].score[id-1] = 
  // feedbacks[cur_id].score[id-1].value = star_idx
}
function set_stars(star_idx, id)
{
  // console.log(star_idx)
  feedbacks.value[cur_id.value].score[id-1] = star_idx
  star_display.value[id-1] = star_idx
}


function submit_feedback()
{
  const json = JSON.stringify(feedbacks.value);
  console.log("form", json)

  axios.post('/submit', json, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'x-access-token' : token.value
    }
  }).then(function({data}) {
    console.log("data", data)
    

    // router.push('/')
  }).catch(function (error) {
    // console.log(error.toJSON());
    console.log("errorjson", error.toJSON());
  });
}


function submit()
{
  console.log("submit", feedbacks.value[cur_id.value].score)
  console.log("feedbacks.value.length", feedbacks.value.length)
  console.log("cur_id", cur_id.value)

  const json = JSON.stringify(feedbacks.value[cur_id.value]);
  console.log("form", json)

  for (let i = 0; i < questions.value.length; i++)
  {
    if (feedbacks.value[cur_id.value].score[i] == 0)
    {
      alert(`Question ${i + 1} has no score`)
      return;
    }
  }

  axios.post('/submit', json, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'x-access-token' : token.value
    }
  }).then(function({data}) {
    console.log("data", data)
    for (let i = 0; i < questions.value.length; i++)
    {
      star_display.value[i] = 0
    }

  var elem = document.getElementById("progress")

  if (cur_id.value == feedbacks.value.length - 1)
  {
    cur_id.value = feedbacks.value.length - 1
    elem.style.width = '100%';
    finish.value = 1
    router.push('/user')
  }
  else
  {
    cur_id.value++
    elem.style.width = ((cur_id.value) / feedbacks.value.length)*100 + '%';
    
  }



  }).catch(function (error) {
    console.log("errorjson", error.toJSON());
    alert(`submit error`)
    
  });

  
}

</script>

<style>

</style>
