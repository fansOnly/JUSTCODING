/**
 * 利用栈结构处理数组类型
 */

export default function nestTokens(tokens) {
  // console.log('tokens: ', tokens);

  let nestedTokens = []
  // 定义收集器，默认存储结果数组，遇到 # 存储新的子数组
  let collector = nestedTokens
  const sections = []

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    switch (token[0]) {
      case '#':
        collector.push(token)
        sections.push(token)
        // 改变收集器指向子数组
        collector = token[2] = []
        break;
      case '/':
          sections.pop()
          collector = sections.length ? sections[sections.length - 1][2] : nestedTokens
          break;
      default:
        collector.push(token)
    }
  }

  return nestedTokens
}
