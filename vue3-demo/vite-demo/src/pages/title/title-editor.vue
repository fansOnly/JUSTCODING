<template>
  <div>
    <div>{{ titles }}</div>
    <div class="editor-content">
      <div class="title-list">
        <div v-for="(title, index) in titles" :key="title.id"
          :class="['title-item', `title-level-${title.level}`, { selected: selectedTitleId === title.id }]"
          @click="selectTitle(title.id)">
          <span>{{ title.number }} {{ title.text }}</span>
          <button class="delete-btn" @click.stop="deleteTitle(title.id)">删除</button>
        </div>
      </div>

      <div class="editable-area">
        <div ref="editor" contenteditable="true" class="editor" @keydown="handleKeyDown" @input="updateTitleText"></div>
      </div>
    </div>

    <div class="controls">
      <button @click="insertTitleAtSelected(1)">插入一级标题</button>
      <button @click="insertTitleAtSelected(2)">插入二级标题</button>
      <button @click="insertTitleAtSelected(3)">插入三级标题</button>
      <button @click="deleteSelectedTitle" class="danger">删除选中标题</button>
      <button @click="exportContent">导出内容</button>
    </div>

    <div v-if="exportedText" class="export-content">
      <h3>导出内容：</h3>
      <pre>{{ exportedText }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const titles = ref([]);
const selectedTitleId = ref(null);
const exportedText = ref('');
const editor = ref(null);

// 添加示例内容
const addDemoContent = () => {
  titles.value = [
    { id: 1, level: 1, number: '1', text: '引言' },
    { id: 2, level: 1, number: '2', text: '文献综述' },
    { id: 3, level: 1, number: '3', text: '方法论' },
    { id: 4, level: 2, number: '3.1', text: '研究设计' },
    { id: 5, level: 2, number: '3.2', text: '数据收集' },
    { id: 6, level: 1, number: '4', text: '结果分析' }
  ];
  updateTitleNumbers();
  updateEditorContent();
};

// 选择标题
const selectTitle = (id) => {
  selectedTitleId.value = id;
  const selectedTitle = titles.value.find(title => title.id === id);
  if (selectedTitle && editor.value) {
    // 滚动到选中的标题
    const titleElement = editor.value.querySelector(`[data-id="${id}"]`);
    if (titleElement) {
      titleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // 设置光标到标题末尾
      const range = document.createRange();
      range.selectNodeContents(titleElement);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
};

// 获取选中标题的索引
const getSelectedIndex = () => {
  if (!selectedTitleId.value) return -1;
  return titles.value.findIndex(title => title.id === selectedTitleId.value);
};

// 在选中标题后插入新标题
const insertTitleAtSelected = (level) => {
  const selectedIndex = getSelectedIndex();
  if (selectedIndex === -1) {
    alert('请先选择一个标题');
    return;
  }

  // 创建新标题
  const newTitle = {
    id: Date.now(),
    level: level,
    number: '',
    text: '新标题'
  };

  // 插入新标题
  titles.value.splice(selectedIndex + 1, 0, newTitle);

  // 更新所有标题序号
  updateTitleNumbers();
  updateEditorContent();

  // 选中新标题
  selectedTitleId.value = newTitle.id;

  // 聚焦编辑器
  if (editor.value) {
    editor.value.focus();
  }
};

// 删除指定标题
const deleteTitle = (id) => {
  const index = titles.value.findIndex(title => title.id == id);
  if (index === -1) return;

  // 删除标题
  titles.value.splice(index, 1);

  // 更新所有标题序号
  updateTitleNumbers();
  updateEditorContent();

  // 设置新的选中标题
  if (titles.value.length === 0) {
    selectedTitleId.value = null;
  } else {
    // 选中前一项，如果删除的是第一项，则选中新的第一项
    const newIndex = index > 0 ? index - 1 : 0;
    selectedTitleId.value = titles.value[newIndex].id;

    // 在下一个DOM更新周期后，滚动到选中的标题
    nextTick(() => {
      selectTitle(selectedTitleId.value);
    });
  }
};

// 删除选中标题
const deleteSelectedTitle = () => {
  if (!selectedTitleId.value) {
    alert('请先选择一个标题');
    return;
  }
  deleteTitle(selectedTitleId.value);
};

// 更新所有标题序号
const updateTitleNumbers = () => {
  let counters = { 1: 0, 2: 0, 3: 0 };
  let prevLevel = 1;

  titles.value.forEach(title => {
    // 重置计数器当遇到更高级别标题时
    if (title.level < prevLevel) {
      for (let i = title.level + 1; i <= 3; i++) {
        counters[i] = 0;
      }
    }

    // 更新计数器
    counters[title.level]++;

    // 生成序号
    if (title.level === 1) {
      title.number = `${counters[1]}`;
    } else if (title.level === 2) {
      title.number = `${counters[1]}.${counters[2]}`;
    } else if (title.level === 3) {
      title.number = `${counters[1]}.${counters[2]}.${counters[3]}`;
    }

    prevLevel = title.level;
  });

  console.log("更新后的标题列表:", JSON.parse(JSON.stringify(titles.value)));
};

// 更新编辑器内容
const updateEditorContent = () => {
  if (!editor.value) return;

  editor.value.innerHTML = '';

  titles.value.forEach(title => {
    const titleElement = document.createElement('div');
    titleElement.className = `title-level-${title.level}`;
    titleElement.textContent = `${title.number} ${title.text}`;
    titleElement.setAttribute('data-id', title.id);

    // 添加点击选择功能
    titleElement.addEventListener('click', () => {
      selectTitle(title.id);
    });

    editor.value.appendChild(titleElement);
  });
};

// 处理键盘事件
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const selectedIndex = getSelectedIndex();
    if (selectedIndex === -1) return;

    const selectedTitle = titles.value[selectedIndex];

    if (e.shiftKey) {
      // Shift+Enter: 插入子级标题
      const nextLevel = Math.min(selectedTitle.level + 1, 3);
      insertTitleAtSelected(nextLevel);
    } else {
      // Enter: 插入同级标题
      insertTitleAtSelected(selectedTitle.level);
    }
  }
  // 处理Backspace键删除整行
  else if (e.key === 'Backspace') {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer;

    // 获取当前标题行元素
    let currentNode = startContainer;
    while (currentNode && currentNode !== editor.value && !currentNode.hasAttribute?.('data-id')) {
      currentNode = currentNode.parentNode;
    }

    if (currentNode && currentNode.hasAttribute('data-id')) {
      const id = currentNode.getAttribute('data-id');

      // 检查是否在行首或整行被选中
      const isAtStart = range.startOffset === 0;
      const isWholeLineSelected = range.toString() === currentNode.textContent;

      if (isAtStart || isWholeLineSelected) {
        e.preventDefault(); // 阻止默认删除行为
        deleteTitle(id);
      }
    }
  }
};

// 更新标题文本
const updateTitleText = () => {
  if (!editor.value || !selectedTitleId.value) return;

  const selectedTitle = titles.value.find(title => title.id === selectedTitleId.value);
  if (!selectedTitle) return;

  const titleElement = editor.value.querySelector(`[data-id="${selectedTitleId.value}"]`);
  if (titleElement) {
    // 提取纯文本内容（去除序号部分）
    const textContent = titleElement.textContent.replace(/^\d+(\.\d+)*\s/, '');
    selectedTitle.text = textContent;

    // 更新左侧列表显示
    const listItem = document.querySelector(`.title-item[data-id="${selectedTitleId.value}"]`);
    if (listItem) {
      const textSpan = listItem.querySelector('span');
      if (textSpan) {
        textSpan.textContent = `${selectedTitle.number} ${selectedTitle.text}`;
      }
    }
  }
};

// 导出内容
const exportContent = () => {
  exportedText.value = titles.value.map(title => {
    const indent = '  '.repeat(title.level - 1);
    return `${indent}${title.number} ${title.text}`;
  }).join('\n');
};

onMounted(() => {
  // 初始化示例内容
  addDemoContent();

  // 初始选中第一个标题
  if (titles.value.length > 0) {
    selectedTitleId.value = titles.value[0].id;
  }
});
</script>


<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.description {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.editor-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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

.editor-content {
  display: flex;
  height: 500px;
}

.title-list {
  width: 300px;
  padding: 20px;
  border-right: 1px solid #eee;
  overflow-y: auto;
}

.title-item {
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-item:hover {
  background-color: #f8f9fa;
}

.title-item.selected {
  background-color: #e3f2fd;
  border-left: 4px solid #3498db;
}

.title-level-1 {
  font-weight: bold;
  font-size: 1.1em;
  color: #2c3e50;
}

.title-level-2 {
  font-weight: bold;
  font-size: 1em;
  margin-left: 15px;
  color: #3498db;
}

.title-level-3 {
  margin-left: 30px;
  color: #e74c3c;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 3px 8px;
  cursor: pointer;
  font-size: 0.8rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

.editable-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.editor {
  min-height: 100%;
  outline: none;
  font-size: 16px;
  line-height: 1.8;
}

.editor .title-level-1 {
  font-weight: bold;
  font-size: 1.4em;
  margin: 20px 0 10px;
  color: #2c3e50;
}

.editor .title-level-2 {
  font-weight: bold;
  font-size: 1.2em;
  margin: 15px 0 8px 30px;
  color: #3498db;
}

.editor .title-level-3 {
  font-weight: bold;
  margin: 12px 0 6px 60px;
  color: #e74c3c;
}

.controls {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

button:hover {
  background: #2980b9;
}

button.secondary {
  background: #95a5a6;
}

button.secondary:hover {
  background: #7f8c8d;
}

button.danger {
  background: #e74c3c;
}

button.danger:hover {
  background: #c0392b;
}

.export-content {
  margin: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 5px;
  border-left: 4px solid #3498db;
}

footer {
  text-align: center;
  margin-top: 40px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .editor-content {
    flex-direction: column;
    height: auto;
  }

  .title-list {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee;
  }

  .toolbar {
    flex-direction: column;
    gap: 10px;
  }

  .controls {
    flex-direction: column;
  }
}
</style>