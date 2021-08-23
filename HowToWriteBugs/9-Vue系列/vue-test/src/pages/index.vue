<template>
  <div>
    <div class="flex">
      <div>{{copyText}}</div>
      <button v-copy="copyText">一键复制文本</button>
      <button @click="handleChangeText">变更文本</button>
    </div>
    <div class="flex">
      <button v-longpress:[duration]="handleLongPress">长按{{duration/1000}}秒</button>
      <button @click="handleChangeDuration(2000)">变更时长2s</button>
      <button @click="handleChangeDuration(3000)">变更时长3s</button>
    </div>
    <div class="flex">
      <button v-debounce:[duration]="handleDebounceCick">防重复点击</button>
      <button @click="handleChangeDuration(2000)">变更时长2s</button>
      <button @click="handleChangeDuration(3000)">变更时长3s</button>
    </div>
    <div class="flex">
      <div>当前权限: {{permission}}</div>
      <button v-permission="permission">红</button>
      <button v-permission="permission">黄</button>
      <button v-permission="permission">蓝</button>
    </div>
    <div>版权水印</div>
      <div v-waterMarker="{text:'版权所有'}" class="water-marker"></div>
    <div class="drag-wrap">
      <div v-draggable class="drag-item">我是可以拖拽的</div>
    </div>
    <div style="height:500px">
    </div>
      <div>图片懒加载</div>
      <img v-lazyLoad="img" class="img-auto" alt="">
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      copyText: '默认文本',
      duration: 1000,
      permission: '颜色',
      img: require('../assets/logo.png'),
    }
  },
  methods: {
    handleChangeText() {
      this.copyText = '随机文本-' + ~~(Math.random() * 999)
    },
    handleLongPress() {
      console.log(`长按了${this.duration/1000}s`)
    },
    handleChangeDuration(val) {
      this.duration = val
    },
    handleDebounceCick() {
      console.log(`${this.duration/1000}s内只能点击一次`, new Date())
    }
  }
}
</script>

<style>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
}
.img-auto {
  width: 100%;
  height: 150px;
}
.water-marker {
  width: 100%;
  height: 200px;
}
.drag-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
}
.drag-item {
  position: relative;
  width: 200px;
  height: 50px;
  background: #ccc;
  color: #fff;
  text-align: center;
  line-height: 50px;
}
</style>
