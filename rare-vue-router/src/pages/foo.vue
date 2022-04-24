<template>
  <div>
    <div>路由</div>
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <foo />
  </div>
</template>

<script>
import Foo from '@/components/Foo'
export default {
  components: {
    Foo
  },
  data() {
    return {
      //
    }
  },
}
</script>
