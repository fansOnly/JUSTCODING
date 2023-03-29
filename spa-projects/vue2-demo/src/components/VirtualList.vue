<template>
  <div class="virtual-list-wrapper" :style="style">
    <slot :list="list" />
  </div>
</template>

<script>
import { supportsPassive } from "./util";

export default {
  name: "VirtualList",
  props: {
    // 源数据
    source: {
      type: Array,
      default: () => [],
    },
    // 预缓冲区数据量
    preCacheCount: {
      type: Number,
      default: 5,
    },
    // 尾缓冲区数据量
    postCacheCount: {
      type: Number,
      default: 5,
    },
    // 展示个数
    showCount: {
      type: Number,
      default: 20,
    },
    // 块的高度
    itemHeight: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      startIndex: 0, // 展示起始索引
      startOffset: 0, // 顶部空白填充
      endOffset: 0, // 底部空白填充
    };
  },
  computed: {
    list() {
      return this.source.slice(this.start, this.end);
    },
    start() {
      return Math.max(this.startIndex - this.preCacheCount, 0);
    },
    end() {
      return Math.min(
        this.startIndex + this.showCount + this.postCacheCount,
        this.source.length
      );
    },
    style() {
      let style = "";
      style += `padding-top: ${this.startOffset}px;`;
      style += `padding-bottom: ${this.endOffset}px;`;
      return style;
    },
  },
  created() {
    this.update();

    window.addEventListener(
      "scroll",
      this.rafScroll,
      supportsPassive ? { passive: true } : false
    );
  },
  destroyed() {
    window.removeEventListener("scroll", this.rafScroll);
  },
  methods: {
    update(scrollTop = 0) {
      this.startIndex = ~~(scrollTop / this.itemHeight);
      this.startOffset = this.itemHeight * this.start;
      this.endOffset = this.itemHeight * (this.source.length - this.end);
    },
    onScroll() {
      const scrollTop = document.documentElement.scrollTop;
      this.update(scrollTop);
    },
    rafScroll() {
      window.requestAnimationFrame(this.onScroll);
    },
  },
};
</script>
