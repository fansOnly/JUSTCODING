
import { lookup } from './utils.js'
import parseArray from './parseArray.js'

export default function renderTemplate(tokens, data) {

  let result = ''

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (token[0] === 'text') {
      result += token[1]
    } else if (token[0] === 'name') {
      // 需要处理嵌套属性 a.b.c
      result += lookup(data, token[1])
    } else if (token[0] === '#') {
      result += parseArray(token, data)
    }
  }

  return result
}
