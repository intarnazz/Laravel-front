<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { GetOnePost } from '@/api/api.js'

const API_URL = import.meta.env.VITE_API_URL
const $route = useRoute()
const post = ref({})

onMounted(async () => {
  await init()
})

async function init() {
  try {
    post.value = await GetOnePost($route.params.id)
    console.log(post.value)
    const date = new Date(post.value.created_at)
    post.value.created_at = date.toLocaleDateString()
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <section class="post">
    <h2>{{ post.title }}</h2>
    <p>был создан: {{ post.created_at }}</p>
    <img :src="`${API_URL}/api/GetImg/${$route.params.id}`" alt="" />
    <p>{{ post.descr }}</p>
  </section>
</template>

<style lang="sass" scoped></style>
