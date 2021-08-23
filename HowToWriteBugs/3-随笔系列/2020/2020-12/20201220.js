/**
 * demo 1
 * 匹配模式
 */
let text, pattern, matches

text = 'cat, bat, sat, fat'

// 普通匹配 - 无论匹配多少次，都只返回第一次匹配的结果
pattern = /.at/
matches = pattern.exec(text)
console.log(matches)// ['cat', 0, ...]
console.log(pattern.lastIndex) // 0

matches = pattern.exec(text)
console.log(matches) // ['cat', 0, ...]
console.log(pattern.lastIndex)


// 全局模式 global
pattern = /.at/g
matches = pattern.exec(text)
console.log(matches) // ['cat', 0, ...]
console.log(pattern.lastIndex) // 3

matches = pattern.exec(text)
console.log(matches) // ['bat', 5, ...]
console.log(pattern.lastIndex) // 8


// 粘附模式匹配 sticky
pattern = /.at/y

matches = pattern.exec(text)
console.log(matches) // ['cat', 0, ...]
console.log(pattern.lastIndex) // 3

matches = pattern.exec(text)
console.log(matches) // null
console.log(pattern.lastIndex) // 0

matches = pattern.exec(text)
console.log(matches) // ['cat', 0, ...]
console.log(pattern.lastIndex) // 3

// move lastIndex to 5
pattern.lastIndex = 5
matches = pattern.exec(text)
console.log(matches) // ['bat', 5, ...]
console.log(pattern.lastIndex) // 8

// move lastIndex to 10
pattern.lastIndex = 10
matches = pattern.exec(text)
console.log(matches) // ['sat', 10, ...]
console.log(pattern.lastIndex) // 13



/**
 * demo2
 * 捕获组
 */
text = 'mom and dad and baby'
pattern = /mom( and dad( and baby)?)?/gi

matches = pattern.exec(text)
console.log(matches[0]) // mom and dad and baby
console.log(matches[1]) // and dad and baby
console.log(matches[2]) // and baby




/**
 * setTimeout 实现 setInterval
 */
const intervalx = (fn, interval, ...args) => {
    const context = this
    setTimeout(() => {
        fn.apply(context, args)
        intervalx(fn, interval, ...args)
    }, interval);
}

// let t = intervalx((num)=>console.log(num),500,10)



/**
 * 找出出现次数最多的元素 - getMostItem()
 */
const getMostItem = arr => {
    const map = new Map()
    arr.map(v => {
        if (map.get(v)) {
            map.set(v, map.get(v)+1)
        } else {
            map.set(v, 1)
        }
    })
    let [maxVal, maxCount] = [[arr[0]], map.get(arr[0])]
    map.forEach((count, item) => {
        if (count > maxCount) {
            maxVal = [item]
            maxCount = count
        } else if (count === maxCount) {
            maxVal.push(item)
        }
    })
    return maxVal
}

const arr00 = ['1', '2', '3', '3', '55', '3', '55', '55', '6', '6']
console.log(getMostItem(arr00)) // ['3', '55']


const obj = {
    1: '1',
    true: 'true',
    null: 'null',
    undefined: 'undefined',
    '': ''
}

for (let key in Object.keys(obj)) {
    console.log(key)
}
