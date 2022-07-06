<template>
  <div class="Thank">
    <h1 style=
    "margin-left: 40%;
    margin-right: 40%;
    margin-top: 40%;">
    Thank you!</h1>
  </div>
</template>

<script setup>

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

window.setTimeout(myFunction, 1000)
function myFunction() {
  router.push('/login');
}
</script>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
