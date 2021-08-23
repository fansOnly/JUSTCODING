<template>
<div class="virture-box">
  <VirtureList2 :list="list" />
</div>
</template>

<script>
import VirtureList2 from '../components/VirtureList2.vue'
import faker from "faker";

const list = [];
const dataLength = 1000;
for (let id = 0; id < dataLength; ++id) {
  list.push({
    id,
    value: faker.lorem.sentences()
  });
}


export default {
  components: {
    VirtureList2
  },
  data() {
    return {
      list,
    }
  }
}
</script>
