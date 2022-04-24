<template>
  <div>
    <div>路由</div>
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <div @click="$store.commit('add')">count: {{$store.state.count}}</div>
    <div @click="$store.dispatch('add')">async count: {{$store.state.count}}</div>
    <div>double count: {{$store.getters.double}}</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  created() {
    this.$store.state = {}
  },
  methods: {
  }
}
</script>

<style>
</style>
