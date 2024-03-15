<template>
<div class="wrapper">
  <div>this is a grand-child component</div>
<div>count:{{ count }}</div>
</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const count = inject('count', 'count inject default value.')
</script>

<style lang="css" scoped>
.wrapper {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>