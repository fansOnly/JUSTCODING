<template>
  <div class="contact">
    <h1>This is an contact page</h1>
    <button @click="goBack">返回</button>
  </div>
</template>

<script type="javascript">
export default {
  name: 'Contact',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>
