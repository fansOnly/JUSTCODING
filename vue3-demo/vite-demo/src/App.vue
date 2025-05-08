<template>
  <div>
    <div class="space">FPS: {{ fps }}</div>
    <div class="section"></div>
    <!-- <catchError /> -->

    <div class="section">
    <video ref="videoRef" controls>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div><button @click="toggleVideoPip()">画中画</button></div>
  </div>
  </div>
</template>

<script setup>
import { useFps } from './hooks/useFps';
import catchError from './components/catch-error.vue'
import { ref } from 'vue';

const fps = useFps();

const videoRef = ref(null);

function toggleVideoPip() {
  if (document.pictureInPictureEnabled) {
    videoRef.value.requestPictureInPicture().then(() => {
      console.log('enter pip');
    }).catch(err => {
      console.log('enter pip err', err);
    })
  } else {
    console.log('pictureInPicture is not supported');
  }
}


</script>

<style scoped lang="scss">
.space {
  margin-bottom: 30px;
}
.section {
  margin-top: 30px;
}
</style>
