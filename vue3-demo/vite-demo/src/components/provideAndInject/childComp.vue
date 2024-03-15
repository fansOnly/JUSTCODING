<script setup>
import { ref } from 'vue'
import grandChildComp from './grandChildComp.vue';

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="wrapper">
    <div>this is a child component</div>
    <grandChildComp />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  border: 1px solid #333;
}
</style>
