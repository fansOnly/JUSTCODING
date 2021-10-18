import Scanner from './scanner.js'
import nestTokens from './nestTokens.js'

export default function parseTemplateToTokens(template) {
  const scanner = new Scanner(template)

  let tokens = []
  let str = ''
  while (!scanner.end()) {
    str = scanner.scanUntil('{{')
    if (str) {
      // 去除多余的空格
      str = str.replace(/(?<!\<\w+)\s*/g, '')
      tokens.push(['text', str])
    }
    scanner.scan('{{')
    // 处理数组循环　
    str = scanner.scanUntil('}}')
    if (str.indexOf('#') === 0) {
      tokens.push(['#', str.substring(1)])
    } else if (str.indexOf('/') === 0) {
      tokens.push(['/', str.substring(1)])
    } else if (str) {
      tokens.push(['name', str])
    }
    scanner.scan('}}')
  }

  return nestTokens(tokens)
}
