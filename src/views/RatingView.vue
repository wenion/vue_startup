<template>
  <div class="rating">
    <h2>admin</h2>

    <div v-if="awesome">
      <!-- <label for="story">Feedback {{router_id}}</label> -->
      <!-- <label for="story">Feedback {{$route.params.id}}</label> -->
      <textarea id="story" name="story" rows="8" cols="80" disabled>{{feedbackItem.feedback_content}}</textarea>
      <!-- <textarea id="story" name="story" disabled>{{feedbackItem.feedback_content}}</textarea> -->
      <!-- <input type="button" value="reset" @click="resetFeedbackContent"> -->
      <form v-for="question in questions" :key="question.id">
        <fieldset class="rating" id="ratingSystem">
          <legend>Q{{question.id+1}} {{question.content}}</legend>
          <div>
            <label for="rating">0 to 10</label>
            <!-- <input type="button" @click="selectRating(question)"> -->

            <!-- <form v-for="star in stars" :key="star"> -->
            <!-- <input v-for="star in stars" :key="star" type="radio" id="star" name="monster" value="star"> -->
            <!-- <label for="kraken">Kraken</label><br/> -->
            <input type="radio" id="star0" name="rating" value="0" v-model="question.value"/>
            <input type="radio" id="star1" name="rating" value="1" v-model="question.value"/>
            <input type="radio" id="star2" name="rating" value="2" v-model="question.value"/>
            <input type="radio" id="star3" name="rating" value="3" v-model="question.value"/>
            <input type="radio" id="star4" name="rating" value="4" v-model="question.value"/>
            <input type="radio" id="star5" name="rating" value="5" v-model="question.value"/>
            <input type="radio" id="star6" name="rating" value="6" v-model="question.value"/>
            <input type="radio" id="star7" name="rating" value="7" v-model="question.value"/>
            <input type="radio" id="star8" name="rating" value="8" v-model="question.value"/>
            <input type="radio" id="star9" name="rating" value="9" v-model="question.value"/>
            <input type="radio" id="star10" name="rating" value="10" v-model="question.value"/>
            <!-- <input type="radio" id="star0" name="rating" value="0" @click="selectRating(value)"/>
            <input type="radio" id="star2" name="rating" value="2" @click="selectRating"/>
            <input type="radio" id="star3" name="rating" value="3" @click="selectRating"/>
            <input type="radio" id="star4" name="rating" value="4" @click="selectRating"/>
            <input type="radio" id="star5" name="rating" value="5" @click="selectRating"/>
            <input type="radio" id="star6" name="rating" value="6" @click="selectRating"/>
            <input type="radio" id="star7" name="rating" value="7" @click="selectRating"/>
            <input type="radio" id="star8" name="rating" value="8" @click="selectRating"/>
            <input type="radio" id="star9" name="rating" value="9" @click="selectRating"/>
            <input type="radio" id="star10" name="rating" value="10" @click="selectRating"/> -->

            <div>Rating: {{ question.value }}</div>
          </div>
          <!-- <output name="result" form="" for="a b">60</output> -->
          <!-- <input type="text" value="10" disabled> -->
        </fieldset>
      </form>

      <input v-if="!lastQuestion" type="button" value="Next" @click="next">
      <input v-else type="button" value="Submit" @click="submit">
    </div>
    <div v-else>
      <h2>Loding...</h2>
    </div>
    
  </div>
</template>

<!-- <script setup> -->
<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue'

const todoId = ref(1)

const awesome = ref(false)

const p = ref(null)
const feedbackItem = ref(null)
const questions = ref(null)
const stars = ref([0,1,2,3,4,5,6,7,8,9,10])

const lastQuestion = ref(false)

import { useStore } from 'vuex'
const store = useStore()

function setToken(token) {
  store.dispatch('setToken', token)
}

const token = computed(() => {
  return store.getters.getToken
})

function resetFeedbackContent()
{

}

console.log("token", token.value)



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

    // console.log(data)
    // console.log("token", token.value)
    p.value = data
    feedbackItem.value = p.value[router.currentRoute._value.params.id]
    questions.value = feedbackItem.value.questions
    // console.log("feedback", feedbackItem)
    awesome.value = true
    // setToken(data.token)
    // router.push('/rating/0', data)
  }).catch(function (error) {
    router.push('/login')
    console.log("error", error);
  });
})

function getFeedback()
{
  axios.get('/get_feedback/0', {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token' : token.value
    }
  //}).then(({data})=> console.log(data)
  }).then(function({data}) {

    // console.log(data)
    // console.log("token", token.value)
    p.value = data
    feedbackItem.value = p.value[router.currentRoute._value.params.id]
    questions.value = feedbackItem.value.questions
    // console.log("feedback", feedbackItem)
    awesome.value = true
    // setToken(data.token)
    // router.push('/rating/0', data)
  }).catch(function (error) {
    console.log("error", error);
  });
}

// getFeedback()

function selectRating(value)
{
  console.log(value);
}

function submit_feedback(feedbackItem, isfinished)
{
  console.log("token", token)
  const form = new FormData();
  // console.log("fp", feedbackItem.user_id)
  form.append("user_id", feedbackItem.user_id);
  form.append("feedback_id", feedbackItem.feedback_id);
  form.append("isfinished", isfinished);

  console.log("questions", feedbackItem.questions.length)

  for (let i = 0; i < feedbackItem.questions.length; i++)
  {
    form.append("question_" + i, feedbackItem.questions[i].value);
    console.log("question" + i, feedbackItem.questions[i].value)
  }

  console.log("form", form)

  axios.post('/submit', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
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

function next()
{
  // console.log("lastQuestion", lastQuestion.value, router.currentRoute._value.params.id, p.value.length)
  // console.log()
  if (router.currentRoute._value.params.id == p.value.length - 2)
  {
    // console.log("lastQuestion 2", lastQuestion.value)
    lastQuestion.value = !lastQuestion.value
    // console.log("lastQuestion after", lastQuestion.value)
  }

  if (router.currentRoute._value.params.id < p.value.length - 1)
  {
    // console.log("current", router.currentRoute._value.params.id)
    let finsh = 1
    for (let i = 0; i < questions.value.length; i++)
    {
      // console.log(questions.value[i].value)
      if (questions.value[i].value === undefined)
      {
        // console.log("null")
        // alert(`Hello`)
        alert(`Question ${i} has no score`)
        finsh = 0
        break
      }
      // console.log("rating", questions.value)
    }

    if (finsh)
    {
      submit_feedback(p.value[router.currentRoute._value.params.id], 'False')

      router.push(`/rating/${++router.currentRoute._value.params.id}`)
      feedbackItem.value = p.value[router.currentRoute._value.params.id]
      questions.value = feedbackItem.value.questions
      // console.log("feedback", feedbackItem)
    }

  }
  else
  {
    console.log("p", p.value) 
  }
}


function submit()
{
  console.log("p", p.value)

  submit_feedback(p.value[router.currentRoute._value.params.id], 'True')
  router.push('/user')
  // lastQuestion.value = true

  // const form = new FormData();
  // form.append("username", p.value);


  // axios.post('/submit', form, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     'x-access-token' : token.value
  //   }
  // }).then(function({data}) {

  //   router.push('/')
  // }).catch(function (error) {
  //   // console.log(error.toJSON());
  //   console.log("errorjson", error.toJSON());
  // });
}

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

// console.log("router", router.currentRoute._value.params.id)

// console.log("router 2", router)



const router_id = computed(() => {
  return router.currentRoute._value.params.id
})



</script>

<style>

/* .rating {
  min-height: 100vh;
  display: flex;
  align-items: center;
} */


textarea {
    font-size: .8rem;
    letter-spacing: 1px;
}
textarea {
    padding: 10px;
    max-width: 100%;
    line-height: 1.5;
    border-radius: 5px;
    border: 10px solid #ccc;
    box-shadow: 1px 1px 1px #999;
}

form {
  padding: 30px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 10px;
  /* border: 10px solid #ccc; */
  /* box-shadow: 1px 1px 1px #999; */
}

/* label {
    display: block;
    margin-bottom: 10px;
} */

/* legend {
    background-color: #000;
    color: #fff;
    padding: 3px 6px;
} */

/* .output {
    font: 1rem 'Fira Sans', sans-serif;
} */

input {
    margin: .4rem;
}
</style>
