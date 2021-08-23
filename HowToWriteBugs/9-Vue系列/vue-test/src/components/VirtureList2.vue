<template>
<div>
  <div>不定高内容</div>
  <div>scrollTop: {{scrollTop}}</div>
  <div>显示个数 limit: {{limit}}</div>
  <div>缓冲区 bufferSize: {{bufferSize}}</div>
  <div>startIndex: {{startIndex}}</div>
  <div>endIndex: {{endIndex}}</div>
  <!-- <div>渲染数据 {{renderList}}</div> -->
  <div style="height:50px"></div>
  <div class="virture-content" :style="`height: ${height}px`" @scroll="onScroll">
    <div class="phantom-content" :style="`height: ${phantomHeight}px;`"></div>
    <div ref="actureContent" class="acture-content" :style="`transform: ${getTransform}`">
      <div v-for="(item, index) in renderList" :key="index" :id="'item-'+item.id" class="virture-item">
        <div class="title">索引：{{item.id}}</div>
        <div class="title">{{item.value}}</div>
        <div>bottom: {{cachedPositions[item.id]}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { binarySearch } from '../utils'
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
      default: 5
    }
  },
  data() {
    return {
      renderList: [], // 真是渲染的数据
      scrollTop: 0, // 当前滚动距离
      originStartIdx: 0, // 默认起始索引
      startIndex: 0, // 起始索引
      endIndex: 0, // 结束索引
      rowHeight: 50, // 行高
      limit: 0, // 显示个数
      cachedPositions: []
    }
  },
  computed: {
    estimatedRowHeight() {
      return this.rowHeight
    },
    phantomHeight() {
      return this.cachedPositions[this.cachedPositions.length - 1]?.bottom
    },
    getTransform() {
      const { startIndex, cachedPositions } = this;
      // 当前滑动offset - 当前被截断的（没有完全消失的元素）距离 - 头部缓冲区距离
      return `translate3d(0,${
        startIndex >=1 ? cachedPositions[startIndex - 1]?.bottom : 0
      }px,0)`;
    }
  },
  watch: {
    endIndex: {
      handler(newVal) {
        this.renderList = this.list.slice(this.startIndex, newVal + 1)

        this.updateCachedPositions()
      },
      immidiate: true
    }
  },
  created() {
    this.limit = Math.floor(this.height / this.estimatedRowHeight)
    this.startIndex = Math.max(this.originStartIdx - this.bufferSize, 0)
    this.endIndex = Math.min(this.originStartIdx + this.limit + this.bufferSize, this.list.length - 1)

    this.initCachedPositions()
  },
  methods: {
    onScroll(evt) {
      const { scrollTop } = evt.target
      const currentStartIdx = this.getStartIndex(scrollTop)
      if (currentStartIdx !== this.startIndex) {
        this.startIndex = Math.max(currentStartIdx - this.bufferSize, 0)
        this.endIndex = Math.min(currentStartIdx + this.limit + this.bufferSize, this.list.length - 1)
      }
      this.scrollTop = scrollTop
    },
    getStartIndex(scrollTop = 0) {
      let idx = binarySearch(
        this.cachedPositions,
        scrollTop,
        (currentValue, targetValue) => {
          return currentValue.bottom - targetValue;
        }
      );

      const targetItem = this.cachedPositions[idx];
      // Incase of binarySearch give us a not visible data(an idx of current visible - 1)...
      if (targetItem.bottom < scrollTop) {
        idx += 1;
      }

      return idx;
    },
    initCachedPositions() {
      for (let i = 0; i < this.list.length; i++) {
        this.cachedPositions[i] = {
          index: i,
          height: this.estimatedRowHeight,
          top: i * this.estimatedRowHeight,
          bottom: (i + 1) * this.estimatedRowHeight,
          diff: 0
        }
      }
    },
    updateCachedPositions() {
      const nodes = this.$refs.actureContent.childNodes
      const startIdx = nodes.length ? Number(nodes[0].id.split('-')[1]) : 0
      nodes.forEach(node => {
        if (!node) {
          return
        }
        const { height } = node.getBoundingClientRect()
        const index = Number(node.id.split('-')[1])
        const oldHeight = this.cachedPositions[index].height
        const diff = oldHeight - height
        if (diff) {
          this.cachedPositions[index].height = height
          this.cachedPositions[index].bottom -= diff
          this.cachedPositions[index].diff = diff
        }
      })

      let diffValue = this.cachedPositions[startIdx].diff
      this.cachedPositions[startIdx].diff = 0;

      for (let i = startIdx + 1; i < this.cachedPositions.length; i++) {
        const item = this.cachedPositions[i]
        item.top = this.cachedPositions[i - 1].bottom
        item.bottom = item.bottom - diffValue

        if (item.diff !== 0) {
          diffValue += item.diff
          item.diff = 0
        }
      }
    }
  }
}
</script>

<style scoped>
.virture-content {
  position: relative;
  overflow-y: auto;
}
.phantom-content {
  position: relative;
}
.acture-content {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.virture-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
</style>
