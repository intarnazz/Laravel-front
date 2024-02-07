<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { GetPosts, PostPost } from '@/api/api.js'
import router from '@/router/router.js'

const emit = defineEmits(['postCreate'])
const props = defineProps(['postCreate'])

const posts = ref([])
const postsArr = ref([])
const postsArrSave = ref([])
const page = ref(1)
const search = ref('')
const postTitle = ref('')
const postText = ref('')
const fileInput = ref()

async function init() {
  try {
    posts.value = await GetPosts()
  } catch (e) {
    console.log(e)
  }
  postsArr.value = Object.values(posts.value)
  postsArrSave.value = postsArr.value.slice()
  console.log(postsArr.value)
}

onMounted(async () => {
  await init()
})

const pageRes = computed(() => {
  return page.value * 4
})

const start = computed(() => {
  return pageRes.value - 4
})

const end = computed(() => {
  return pageRes.value
})

const postsArrPromis = computed(() => {
  return postsArr.value.slice(start.value, end.value)
})

const postsArrLength = computed(() => {
  return postsArr.value.length / 4
})

function paginationEvent(value) {
  page.value += value
}

function searchEvent() {
  postsArr.value = []
  postsArrSave.value.forEach((element) => {
    if (element.title.toUpperCase().includes(search.value.toUpperCase())) {
      postsArr.value.push(element)
    }
  })
}

async function submitPost() {
  const file = fileInput.value.files[0]
  try {
    PostPost(postTitle.value, postText.value, file)
    emit('postCreate', { event: true, massage: 'Пост успешно создан' })
    router.push({ name: 'Home' })
  } catch (e) {
    console.log(e)
  }
}
function flashExist() {
  emit('postCreate', { event: false, massage: '' })
}

watch(() => search.value, searchEvent)
</script>

<template>
  <section class="post">
    <div class="post__left">
      <input v-model="search" placeholder="Search..." type="text" />
      <div v-if="props.postCreate.event" class="ok massage">
        <p>*{{ props.postCreate.massage }}</p>
        <div @click="flashExist" class="flashExist">X</div>
      </div>
      <ul class="post__list">
        <li v-for="(value, key) in postsArrPromis" :key="key" class="post__item">
          <RouterLink :to="{ name: 'Post', params: { id: value.id } }">
            <div class="post__header">
              <p>{{ value.short_title }}</p>
              <p>Autor: @{{ value.name }}</p>
            </div>
            <div class="post__content">
              {{ value.descr }}
            </div>
          </RouterLink>
        </li>
      </ul>
      <div class="button__wrapper">
        <div class="button__box">
          <button v-if="page > 1" @click="paginationEvent(-1)" class="button">Left</button>
        </div>
        <div class="button__box">
          {{ page }}
        </div>
        <div class="button__box">
          <button v-if="page < postsArrLength" @click="paginationEvent(1)" class="button">
            Right
          </button>
        </div>
      </div>
    </div>
    <form class="form" @submit.prevent="submitPost()">
      <p>
        <label for="title">title</label
        ><input v-model="postTitle" type="text" name="title" id="title" />
      </p>
      <p>
        <label for="text">text</label><textarea v-model="postText" rows="4" name="text" id="text" />
      </p>
      <p>
        <input ref="fileInput" name="img" type="file" />
      </p>
      <p><input type="submit" value="post" /></p>
    </form>
  </section>
</template>

<style scoped>
.flashExist {
  cursor: pointer;
}
.massage {
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
}
.ok {
  color: #fff;
  background-color: rgba(4, 161, 109, 0.6);
}
.post__left {
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.button__wrapper {
  display: flex;
  gap: 1em;
}
.button__box {
  width: 20px;
  display: flex;
  justify-content: center;
}
.post {
  height: 700px;
  width: 900px;
  display: flex;
  gap: 1em;
  justify-content: space-between;
}
.button {
  cursor: pointer;
  background-color: #fff;
}
.post__list {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.post__header {
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
</style>
