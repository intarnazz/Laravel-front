<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const flash = ref({})

function postCreateEvent(obj) {
  console.log(obj);
  flash.value = obj
}
</script>

<template>
  <RouterView @postCreate="postCreateEvent" :postCreate="flash"  />
</template>

<style lang="sass"></style>
