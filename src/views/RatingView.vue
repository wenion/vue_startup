<template>
  <div v-if="awesome">
    <v-window
      v-model="window"
      show-arrows
    >
      <v-window-item
        v-for="n in feedbacks"
        :key="n.id"
      >
      <v-card
        class="mx-auto"
        max-width="800"
        style= "margin-top: 5%;"
      >
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>Hi, {{user.username}}</span>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <!-- <h3>Title {{n.id}}</h3> -->
          <p>[{{n.id}}/{{feedbacks.length}}] {{n.assign_name}}</p>
          
          <!-- <h3>Title {{$route.params.id}}</h3> -->
        </v-card-title>

        <v-textarea
          name="content"
          auto-grow
          rows="10"
          :value="n.commenttext"
          style="margin-left: 5%; margin-right: 5%"
        ></v-textarea>

        <v-list>
          <v-list-item
            v-for="question in questions"
            :key="question.id"
          >
            <v-col
              cols="12"
              md="10"
              style="margin: auto;"
            >
              <v-list-item-header>
                <!-- <v-list-item-title v-text="question.content"></v-list-item-title> -->
                <p>{{question.content}}</p><br/>
                <p v-if="n.score[question.id-1]">Your selection is <b>{{n.score[question.id-1]}}</b></p>
                <p v-else>You haven't rate</p>
                <!-- <v-list-item-subtitle>
                  x
                </v-list-item-subtitle> -->
              </v-list-item-header>
                
              <div class="d-flex flex-column align-center justify-center">
                <v-rating
                  v-model="n.score[question.id-1]"
                  class="ma-2"
                  empty-icon="mdi-circle-outline"
                  full-icon="mdi-circle"
                  length = 5
                  :item-labels="['1', '2', '3', '4', '5']"
                  item-label-position="bottom"
                ></v-rating>
              </div>
            </v-col>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="submit"
            size="large"
          >
            {{buttonText}}
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-window-item>
  </v-window>
  </div>
  <div v-else>
    <h2>Loding...</h2>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue'

const todoId = ref(1)

const step = ref(3)

const window = ref(0)

// const id = $route.params.id;

const awesome = ref(false)

// const buttonText = ref('Next')

const feedbacks = ref(null)
const questions = ref(null)

const lastQuestion = ref(false)

import { useStore } from 'vuex'
const store = useStore()


import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

// console.log("router", router.currentRoute._value.params.id)

// console.log("router 2", router)



const router_id = computed(() => {
  return router.currentRoute._value.params.id
})

const token = computed(() => {
  return store.getters.getToken
})

const user = computed(() => {
  return store.getters.getUser
})

const buttonText = computed(() => {
  if (window.value == feedbacks.value.length - 1)
  {
    return "Sumbit"
  }
  else
  {
    return "Next"
  }
})

// const p = computed(() => {
//   return store.getters.getP
// })



import axios from 'axios'
axios.defaults.baseURL = 'http://34.125.129.147:5000'

onMounted(() => {

  console.log("asios")
  axios.get('/get_feedback/0', {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token' : token.value
    }
  //}).then(({data})=> console.log(data)
  }).then(function({data}) {
    feedbacks.value = data.feedback

    // console.log("feedbacks>>",feedbacks.value.length)
    // let i = 0
    // for (; i< feedbacks.value.length; i++)
    // {
    //   feedbacks[i].push()
    // }
    questions.value = data.question
    console.log("feedbacks", feedbacks.value, questions.value);
    awesome.value = true
  }).catch(function (error) {
    router.push('/login')
    console.log("error", error);
  });


})






function submit_feedback()
{
  // console.log("token", token)
  // const form = new FormData();
  // form.append("user_id", feedbacks);
  // form.append("feedback_id", feedbackItem.feedback_id);

  // for (let i = 0; i < feedbackItem.questions.length; i++)
  // {
  //   form.append("question_" + i, feedbackItem.questions[i].rating);
  //   console.log("question" + i, feedbackItem.questions[i].rating)
  // }

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
  let page = (window.value+1) % feedbacks.value.length
  if (page != 0)
  {
    // next
    window.value = page
    return
  }
  else
  {
    // submit
    for (let i = 0; i < feedbacks.value.length; i++)
    {
      for (let j = 0; j < feedbacks.value[i].score.length; j++)
      {
        // console.log(">>>>", s, feedbacks.value[i].score[s])
        if (feedbacks.value[i].score[j] === 0)
        {
          alert(`Text ${i+1}/${feedbacks.value.length} Question ${j + 1} has no score`)
          return
        }
      }
    }

    console.log("submiting", feedbacks.value)
    submit_feedback()
    router.push('/thank')
  }
}


// const currentTitle = computed(() => {
//   switch (step.value) {
//           case 1: return 'Sign-up'
//           case 2: return 'Create a password'
//           default: return 'Account created'
//         }
// })



</script>

<style>

</style>
