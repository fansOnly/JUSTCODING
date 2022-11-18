const obj = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    '3': 'd',
}

console.log(Object.keys(obj))

const objectToArray = (obj) => {
    let arr = []
    for (let key in Object.keys(obj)) {
        arr.push({name: obj[key], value: key})
    }
    return arr
}
const arr = objectToArray(obj)
console.log(arr)

console.log(parseFloat(0))

const formatNumber = (num) => {
    if (num >= 1e8) {
        return (num / 1e8).toFixed(2) + '亿'
    } else if (num >= 1e5) {
        return (num / 1e4).toFixed(2) + '万'
    } else {
        return num
    }
  }


console.log(formatNumber(100000000))



const arr2 = [1,2,3,4,5,6,7,8,9,10]

const getRandArrayItem = (arr, size = 0) => {
    let res = []
    while (size > 0) {
        const randIndex = ~~(Math.random() * arr.length)
        res = res.concat(arr.splice(randIndex, 1))
        size--
    }
    return res
}

console.log(getRandArrayItem(arr2, 9))


const map = new Map()
let val
const test = (key,) => {
    return map.get(key) || map.set(key, (val = new Set()))
}
console.log(val)
console.log(test('a'))
console.log(test('a'))
console.log(val)
