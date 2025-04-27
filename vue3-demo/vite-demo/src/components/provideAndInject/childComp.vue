<script setup>
import { ref } from 'vue'
import grandChildComp from './grandChildComp.vue';

defineProps({
  msg: String,
})

function test(a) {
    console.log(a.b.c)
}

test(null)
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
