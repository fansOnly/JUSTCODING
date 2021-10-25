import { parseAttrs } from './utils.js'

export default function (template) {

  let i = 0
  // 开始标签正则，匹配 attrs 属性
  const startRegExp = /^\<([a-z]+[1-6]?)(\s+[^\>]+)?\>/
  // 结束标签正则
  const endRegExp = /^\<\/([a-z]+[1-6]?)\>/
  // 文字匹配正则
  const textRegExp = /^([^\>]+)\<\/[a-z]+[1-6]?\>/

  // 存储标签
  // const stack1 = []
  // 存储文本内容
  const stack2 = [{children: []}]

  while (i < template.length - 1) {
    const rest = template.substring(i)

    if (startRegExp.test(rest)) {
      const tag = rest.match(startRegExp)[1]
      const attrsStr = rest.match(startRegExp)[2]
      // console.log('匹配到开始标签: ', tag, attrsStr);
      // stack1.push(tag)
      stack2.push({tag, children: [], attrs: parseAttrs(attrsStr), type: 1})
      i += 2 + (attrsStr ? attrsStr.length : 0) // <>
    } else if (endRegExp.test(rest)) {
      const tag = rest.match(endRegExp)[1]
      // console.log('匹配到结束标签', tag)
      // 结束标签匹配到开始标签
      // const lastTag = stack1.pop()
      const lastTag = stack2[stack2.length - 1].tag
      if (tag === lastTag) {
        //  匹配的结束标签栈顶出栈，文字也出栈，将值压入新的文本栈顶
        const lastText = stack2.pop()
        if (stack2.length) {
          stack2[stack2.length - 1].children.push(lastText)
        }
        // console.log(stack1, JSON.stringify(stack2));
      } else {
        throw new Error(lastTag + '非法的结束标签')
      }
      i += 3 // </>
    } else if (textRegExp.test(rest)) {
      const text = rest.match(textRegExp)[1]
      if (!/^\s+$/.test(text)) {
        // console.log('匹配内容', text)
        stack2[stack2.length - 1].children.push({text, type: 3})
      }
      i += text.length
    } else {
      i++
    }
  }

  return stack2[0].children[0]
}
