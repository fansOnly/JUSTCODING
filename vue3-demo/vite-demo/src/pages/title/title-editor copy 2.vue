<template>
  <div class="title-editor">
    <div class="toolbar">
      <div class="instructions">
        <strong>操作指南：</strong>
        <span>按Enter键创建同级标题，按Shift+Enter创建子级标题</span>
      </div>
      <!-- <div class="actions">
        <button @click="insertTitle(1)" class="btn btn-primary">插入一级标题</button>
        <button @click="insertTitle(2)" class="btn btn-secondary">插入二级标题</button>
        <button @click="insertTitle(3)" class="btn btn-tertiary">插入三级标题</button>
        <button @click="clearEditor" class="btn btn-clear">清空内容</button>
        <button @click="exportContent" class="btn btn-export">导出内容</button>
      </div> -->
    </div>

    <div ref="editor" contenteditable="true" class="editor" @keydown="handleKeyDown" @click="focusEditor"></div>

    <div v-if="exportedText" class="export-content">
      <h3>导出内容：</h3>
      <pre>{{ exportedText }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const editor = ref(null)
const exportedText = ref('')

// 标题计数器
const counters = ref({ 1: 0, 2: 0, 3: 0 })
// 当前光标位置
const currentRange = ref(null)
const lineNum = ref(0)
const currentLineId = ref('0')
const lines = new Map()
const keys = ref({ 1: 0, 2: 0, 3: 0, 4: 0, 5:0 ,6: 0 })

// 保存当前选区
const saveSelection = () => {
  const sel = window.getSelection()
  if (sel.rangeCount > 0) {
    currentRange.value = sel.getRangeAt(0)
  }
}

// 恢复选区
const restoreSelection = () => {
  if (!currentRange.value) return
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(currentRange.value)
}

// 获取当前行元素
const getCurrentLineElement = () => {
  const sel = window.getSelection()
  if (!sel.anchorNode) return null

  let node = sel.anchorNode
  // 向上遍历找到行元素
  while (node && node.parentNode !== editor.value) {
    node = node.parentNode
  }
  return node
}

// 获取当前行的级别
const getCurrentLineLevel = () => {
  const lineElement = getCurrentLineElement()
  if (!lineElement) return 1

  for (let i = 1; i <= 3; i++) {
    if (lineElement.classList.contains(`title-level-${i}`)) {
      return i
    }
  }
  return 1
}

// 插入带序号的标题
const insertNumberedLine = (level) => {
  saveSelection()
  console.log('id=', currentLineId.value)

  let line = null
  let nextLineId = ''

  // 更新计数器
  if (level === 1) {
    line = lines.get('root')
    console.log('line1: ', line);
    if (!line) {
      line = new Set()
      lines.set('root', line)
    }
    nextLineId = Number(currentLineId.value) + 1
    if (!line.has(nextLineId)) {
    line.add(nextLineId)
    } else {
      // 更新后面的序号
    }
    counters.value[1]++
    counters.value[2] = 0
    counters.value[3] = 0
  } else if (level === 2) {
    counters.value[2]++
    counters.value[3] = 0
  } else if (level === 3) {
    counters.value[3]++
  }
  console.log('line2: ', line);

  const prefix = level === 1
    ? `${counters.value[1]}.`
    : level === 2
      ? `${counters.value[1]}.${counters.value[2]}.`
      : `${counters.value[1]}.${counters.value[2]}.${counters.value[3]}.`

    const dataKey = level === 1 ? nextLineId : '--'

  // 创建标题元素
  const lineEle = document.createElement('div')
  lineEle.className = `title-level-${level}`
  lineEle.textContent = `${prefix} `
  lineEle.setAttribute('data-key', dataKey)
  lineEle.setAttribute('data-level', level)

  // 插入元素
  editor.value.appendChild(lineEle)

  // 移动光标到新行
  const range = document.createRange()
  range.setStart(lineEle, 1)
  range.setEnd(lineEle, 1)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)

  // 更新当前行号
  currentLineId.value = nextLineId
}

// 键盘事件处理
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()

    const currentLevel = getCurrentLineLevel()

    if (e.shiftKey) {
      // Shift+Enter: 插入子级标题
      const nextLevel = Math.min(currentLevel + 1, 3)
      insertNumberedLine(nextLevel)
    } else {
      // Enter: 插入同级标题
      insertNumberedLine(currentLevel)
    }
  }
}

// 手动插入标题
const insertTitle = (level) => {
  insertNumberedLine(level)
  editor.value.focus()
}

// 聚焦编辑器
const focusEditor = (evt) => {
  if (editor.value) {
    editor.value.focus()
    const dataset =  evt.target.dataset || {}
    console.log('dataset: ', dataset);
    // lineNum.value = dataset.line
    currentLineId.value = dataset.key
  }
}

// 清空编辑器
const clearEditor = () => {
  if (editor.value) {
    editor.value.innerHTML = ''
    counters.value = { 1: 0, 2: 0, 3: 0 }
    exportedText.value = ''
    insertNumberedLine(1)
  }
}

// 导出内容
const exportContent = () => {
  if (editor.value) {
    exportedText.value = editor.value.innerText
  }
}

onMounted(() => {
  // 初始化编辑器
  if (editor.value) {
    insertNumberedLine(1)
  }
})
</script>

<style scoped lang="scss">
.title-editor {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
}

.toolbar {
  background: #3498db;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.instructions {
  font-size: 0.9rem;
}

.instructions strong {
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn-primary {
  background: #2ecc71;
  color: white;
}

.btn-primary:hover {
  background: #27ae60;
}

.btn-secondary {
  background: #f39c12;
  color: white;
}

.btn-secondary:hover {
  background: #d35400;
}

.btn-tertiary {
  background: #9b59b6;
  color: white;
}

.btn-tertiary:hover {
  background: #8e44ad;
}

.btn-clear {
  background: #e74c3c;
  color: white;
}

.btn-clear:hover {
  background: #c0392b;
}

.btn-export {
  background: #34495e;
  color: white;
}

.btn-export:hover {
  background: #2c3e50;
}

.editor {
  min-height: 400px;
  padding: 25px;
  outline: none;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  line-height: 1.8;
}

.title-level-1 {
  font-weight: bold;
  font-size: 1.4em;
  margin: 20px 0 10px;
  color: #2c3e50;
}

.title-level-2 {
  font-weight: bold;
  font-size: 1.2em;
  margin: 15px 0 8px 30px;
  color: #3498db;
}

.title-level-3 {
  font-weight: bold;
  margin: 12px 0 6px 60px;
  color: #e74c3c;
}

.export-content {
  margin: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 5px;
  border-left: 4px solid #3498db;
}

.export-content h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.compatibility {
  padding: 20px;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}

.compatibility h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.compatibility ul {
  margin-left: 20px;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    gap: 15px;
  }

  .actions {
    flex-wrap: wrap;
    justify-content: center;
  }

  .title-level-2 {
    margin-left: 20px;
  }

  .title-level-3 {
    margin-left: 40px;
  }
}
</style>