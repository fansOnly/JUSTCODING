

// ?: 匹配不捕获
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 匹配属性描述
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 匹配开始标签，捕获的是标签名
const startTagClose = /^\s*(\/?)>/ // 匹配结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

// 不停的匹配标签，捕获需要的属性，然后删除，继续捕获后面的内容
function parseHTML(html) {
  while (html) {
    let textEnd = html.indexOf('<') // 匹配开始标签
    if (textEnd === 0) {
      let startTagMatch = parseStartTag() // 获取匹配的结果 tagName attrs
      if (startTagMatch) {
        handleStartTag(startTagMatch)
        continue // 开始标签匹配完了继续再一次匹配
      }

      let endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        parseEndTag(endTagMatch[1])
        continue
      }
    }

    let text
    if (textEnd > 0) {
      text = html.substring(0, textEnd)
    }
    if (text) {
      advance(text.length)
      chars(text)
    }
  }

  // 截取字符串
  function advance(n) {
    html = html.substring(n)
  }

  function parseStartTag () {
    let start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length) // 将开始标签去掉

      let end, attr
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length) // 将属性描述删除
        match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]})
      }

      if (end) { // 将结束标签删除
        advance([end[0].length])
        return match
      }
    }
  }

  function handleStartTag(match) {
    console.log('开始标签', match.tagName, '属性', match.attrs)
  }

  function chars(text) {
    console.log('文本是', text)
  }

  function parseEndTag(tagName) {
    console.log('结束标签', tagName)
  }
}

// AST 是用对象描述原生的语法
// 虚拟 DOM 是用对象描述 DOM 节点
export function compileToFunctions(template) {
  let root = parseHTML(template)

  return function render() { // 返回虚拟 DOM
    //
  }
}



// AST = {
//   tag: 'div', // 标签名称
//   attrs: [
//     { name: 'id', value: 'app' },
//   ],
//   type: 1, // 标签类型
//   children: [] // 子节点
// }


// Vnode = {
//   tag: 'div',
//   data: [
//     // { attrs: }
//   ],
//   children: []
// }
