<template>
  <div>
    <div>路由</div>
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <bar />
  </div>
</template>

<script>
import Bar from '@/components/Bar'
export default {
  components: {
    Bar
  },
  data() {
    return {
      //
    }
  },
}
</script>
