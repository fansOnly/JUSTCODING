/**
 * 扫描器类
 */
export default class Scanner {
  constructor(template) {
    // 原始字符串
    this.template = template
    // 指针位置
    this.pos = 0
    this.tail = template
  }

  /**
   * 让指针跳过指定的标识 {{ / }}
   */
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) {
      this.pos += tag.length
      this.tail = this.template.substring(this.pos)
    }
  }

  /**
   * 扫描字符串，找到指定的标识，记录扫描的内容
   * @param stopTag 结束位置
   * @return {string} 返回捕获的字符串内容
   */
  scanUntil(stopTag) {
    // 缓存上一次的指针位置
    const posPrev = this.pos
    // 结束条件：遇到指定的标识符
    while(!this.end() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++
      this.tail = this.template.substring(this.pos)
    }
    return this.template.substring(posPrev, this.pos)
  }

  end() {
    return this.pos === this.template.length
  }
}
