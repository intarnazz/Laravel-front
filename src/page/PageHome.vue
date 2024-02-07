<script setup>
import SectionHome from '@/components/section/SectionHome.vue'

const emit = defineEmits(['postCreate'])
const props = defineProps(['postCreate'])

function postCreateEvent(obj) {
  console.log(obj);
  emit('postCreate', obj)
}
</script>

<template>
  <main>
    <SectionHome @postCreate="postCreateEvent" :postCreate="props.postCreate" />
  </main>
</template>

<style lang="sass" scoped></style>