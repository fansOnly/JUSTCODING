const map = new Map()

map.set('a', 1).set('b', 2)

map.forEach((item, key) => {
    console.log(item)
    console.log(key)
})


const set = new Set()

set.add('a').add('b')

set.forEach((item, ) => {
    console.log(`${item}`)
})


const symbol = Symbol('sym')

console.log(Object.prototype.toString.call(symbol))

console.log(Object.prototype.toString.call(function() {}))

console.log(typeof function() {})
console.log(typeof (() => {}))
