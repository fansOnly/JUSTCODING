<template>
<div>
  <div>scrollTop: {{scrollTop}}</div>
  <div>显示个数 limit: {{limit}}</div>
  <div>缓冲区 bufferSize: {{bufferSize}}</div>
  <div>startIndex: {{startIndex}}</div>
  <div>endIndex: {{endIndex}}</div>
  <div>渲染数据 {{renderList}}</div>
  <div style="height:50px"></div>
  <div class="virture-content" :style="`height: ${height}px`" @scroll="onScroll">
    <div :style="`height: ${list.length * rowHeight}px;position: relative;`">
      <div v-for="(item, index) in renderList" :key="index" class="virture-item" :style="`height: ${rowHeight}px;top:${(startIndex + index) * rowHeight}px;`">
        <div class="title">{{item}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 500
    },
    bufferSize: { // 缓冲区个数
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      renderList: [], // 真是渲染的数据
      scrollTop: 0, // 当前滚动距离
      originStartIdx: 0, // 默认起始索引
      startIndex: 0, // 起始索引
      endIndex: 0, // 结束索引
      rowHeight: 90, // 行高
      limit: 0, // 显示个数
    }
  },
  watch: {
    endIndex: {
      handler(newVal) {
        this.renderList = this.list.slice(this.startIndex, newVal)
      },
      immidiate: true
    }
  },
  created() {
    this.limit = Math.floor(this.height / this.rowHeight)
    this.startIndex = Math.max(this.originStartIdx - this.bufferSize, 0)
    this.endIndex = Math.min(this.originStartIdx + this.limit + this.bufferSize, this.list.length - 1)
  },
  methods: {
    onScroll(evt) {
      const { scrollTop } = evt.target
      const currentStartIdx = Math.floor(scrollTop / this.rowHeight)

      if (currentStartIdx !== this.startIndex) {
        this.startIndex = Math.max(currentStartIdx - this.bufferSize, 0)
        this.endIndex = Math.min(currentStartIdx + this.limit + this.bufferSize, this.list.length - 1)
      }
      this.scrollTop = scrollTop
    }
  }
}
</script>

<style scoped>
.virture-content {
  overflow-y: auto;
}
.virture-item {
  position: absolute;
  right: 0;
  left: 0;
  border-bottom: 1px solid #eee;
  line-height: 50px;
}
</style>
