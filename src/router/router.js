import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/page/PageHome.vue'
import Post from '@/page/PagePost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Post/:id',
      name: 'Post',
      component: Post
    },
  ]
})

export default router
