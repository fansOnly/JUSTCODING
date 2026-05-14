<template>
  <div class="app-container">
    <header>
      <h1>多级标题编辑器</h1>
    </header>

    <TitleEditor />
  </div>
</template>

<script setup>
import TitleEditor from './title-editor.vue'
</script>

<style scoped>
.app-container {
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.description {
  color: #7f8c8d;
  font-size: 1.1rem;
}
</style>