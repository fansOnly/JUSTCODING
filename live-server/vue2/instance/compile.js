import Watcher from "../observe/Watcher.js"

export default class Compile {
  constructor (el, vue) {
    this.$vue = vue
    this.$el = document.querySelector(el)

    if (this.$el) {
      const $fragment = this.node2Fragment(this.$el)
      this.compile($fragment)
      this.$el.appendChild($fragment)
    }
  }

  node2Fragment(el) {
    let fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }

  compile(el) {
    const childNodes = el.childNodes

    const reg = /\{\{(.*)\}\}/

    childNodes.forEach(node => {
      let text = node.textContent
      if (node.nodeType == 1) {
        this.compileElement(node)
      } else if (node.nodeType == 3 && reg.test(text)) {
        const name = text.match(reg)[1]
        this.compileText(node, name)
      }
    })
  }

  /**
   * 元素节点
   */
  compileElement(node) {
    const nodeAttrs = node.attributes

    Array.prototype.slice.call(nodeAttrs).forEach(attr => {
      const attrName = attr.name
      const attrValue = attr.value

      const dir = attrName.substring(2)

      // 指令绑定
      if (attrName.indexOf('v-') == 0) {
        if (dir === 'model') {
          console.log('model 指令')
          new Watcher(this.$vue, attrValue, newVal => {
            node.value = newVal
          })
          let v = this.getNestedValue(this.$vue, attrValue)
          node.value = v

          node.addEventListener('input', e => {
            const newVal = e.target.value
            this.setNestedVal(this.$vue, attrValue, newVal)
            v = newVal
          })
        } else if (dir === 'if') {
          console.log('if 指令')
        }
      }
    })
  }

  /**
   * 文本节点
   */
  compileText(node, name) {
    node.textContent = this.getNestedValue(this.$vue, name)
    new Watcher(this.$vue, name, newVal => {
      node.textContent = newVal
    })
  }

  /**
   * 获取嵌套的属性
   */
  getNestedValue(vue, exp) {
    let val = vue
    exp.split('.').forEach(key => {
      val = val[key]
    })
    return val
  }

  /**
   * 设置嵌套的属性
   */　
  setNestedVal(vue, exp, value) {
    let val = vue
    exp = exp.split('.')
    exp.forEach((key, index) => {
      if (index < exp.length - 1) {
        val = val[key]
      } else {
        val[key] = value
      }
    })
  }
}
