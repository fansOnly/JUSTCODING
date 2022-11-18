/**
 * 正则表达式匹配模板
 */
const str = '<p>我买了一个{{thing}}，好{{mod}}</p>'

const data = {
   thing: '手机',
   mod: '开心'
}


function render(template, data) {
  const reg = /\{\{(\w+)\}\}/g
  return template.replace(reg, (_, $1) => {
    return data[1]
  })
}

console.log(render(str, data))
