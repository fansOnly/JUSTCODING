/**
 * 将属性字符串转换为属性数组
 * <h3 class="title_111 title222"    id="t-1"   data-v="auaud22">你好</h3>
 *  class="title_111 title222"    id="t-1"   data-v="auaud22"
 * [{name: 'class', value: 'title_111 title222'}, {name: 'id', value: 't-1'}, {name: 'data-v', value: 'auaud22'}]
 */
export function parseAttrs(attrsStr) {
  if (!attrsStr) return []

  const attrRegExp = /([^=\'\"\s]+)=(?:[\"\']?)([\w-\s]+)(?:[\'\"]?)/
  const allMatch = new RegExp(attrRegExp, 'g')
  const reg = new RegExp(attrRegExp, '')
  const matches = attrsStr.match(allMatch)
  return matches.map(match => {
    const m = match.match(reg)
    return { name: m[1], value: m[2] }
  })
}
