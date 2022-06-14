<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import { ref, onMounted, computed } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
onMounted(() => {

  // console.log("on mout", token.value)
  // if (token.value =='')
  // {
    router.push('/login')
  // }
})
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
  </main>
</template>
