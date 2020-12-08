const a = [1,2]
const b = [...a]
console.log(a == b)

const s = [{}]
const t = [...s]

s[0].a = '1'
console.log(t[0].a)
console.log(s[0] === t[0])


function ss() {}

console.log(ss.toString())
console.log(ss.valueOf())
