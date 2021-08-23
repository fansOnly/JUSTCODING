// 对象数组去重
const arr = [{a:1,b:2}, {a:2, b:3}, {a:2, b:3}, {a:3, b:4}]

const deDuplication = arr => {
  const keys = [...new Set(arr.map(v => v.a))]
  return keys.map((v) => arr.find(k => k.a === v))
}

console.log(deDuplication(arr))
