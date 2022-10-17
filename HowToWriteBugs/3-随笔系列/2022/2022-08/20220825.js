export default function mergeStyleByOrder(source, target) {
  if (!source || !target) return source ?? target ?? ''
  const styleReg = /([\w-]+):\s*([^;]+)/ig
  const sourceStyleObj = {}
  const targetStyleObj = {}
  source.replace(styleReg, function (_, key, val) {
    sourceStyleObj[key] = val
  })
  target.replace(styleReg, function (_, key, val) {
    targetStyleObj[key] = val
  })
  console.log('sourceStyleObj: ', sourceStyleObj)
  console.log('targetStyleObj: ', targetStyleObj)
  const styleObj = Object.assign(sourceStyleObj, targetStyleObj)
  let style = ''
  for (const [key, val] of Object.entries(styleObj)) {
    style += `${style ? ' ' : ''}${key}: ${val.trim()};`
  }
  return style
}


const s1 = 'color: red; font-size: 12px;border:      1px solid #fff ;'
const s2 = 'background:#fff;font-size:20px;color:#ccc;'
console.log(mergeStyleByOrder(s1, s2))


console.log(mergeStyleByOrder(null, undefined))
