<template>
<div class="virture-box">
  <VirtureList :list="list" />
</div>
</template>

<script>
import VirtureList from '../components/VirtureList.vue'
export default {
  components: {
    VirtureList
  },
  data() {
    const list = Array.from({length: 10000}).map((_, i) => i)
    return {
      list,
    }
  }
}
</script>

<style scoped>
.virture-box {
  /* height: 400px;
  overflow-y: auto;
  background: #eee; */
}
</style>
