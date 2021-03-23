
function getDataType(data) {
    const _toString = Object.prototype.toString
    const result = _toString.call(data)
    return result.replace(/^\[object\s(.*)\]$/, '$1').toLowerCase()
}

function compareArray(data1, data2) {
    if (data1.length !== data2.length) return false
    let isEqual = true
    for (let i in data1) {
        const item1 = data1[i]
        const item2 = data2[i]
        isEqual = compareData(item1, item2)
        if (!isEqual) break
    }
    return isEqual
}

function compareObject(data1, data2) {
    const keysArr1 = Object.keys(data1)
    const keysArr2 = Object.keys(data2)
    if (keysArr1.length !== keysArr2.length) return false
    return isEqualObject(data1, data2)
}

function isEqualObject(data1, data2) {
    let isEqual = true
    for (let [key, val1] of Object.entries(data1)) {
        const val2 = data2[key]
        isEqual =  compareData(val1, val2)
        if (!isEqual) break
    }
    return isEqual
}

function compareData(data1, data2) {
    const type1 = getDataType(data1)
    const type2 = getDataType(data2)
    if (type1 !== type2) return false
    if (type1 === 'array') {
        console.log(data1)
        console.log(data2)
        return compareArray(data1, data2)
    }
    if (type1 === 'object') {
        console.log(data1)
        console.log(data2)
        return compareObject(data1, data2)
    }
    console.log(3)
    return data1 === data2
}

var arr1 = [
    { id: 1, name: '1', obj: { a: 1, c: ['1', {x: 1}] } },
    // { id: 2, name: '2', age: 2 }
]
var arr2 = [
    { id: 1, name: '1', obj: { a: 1, c: ['1', {x: 1}] } },
    // { id: 2, name: '2', age: 2 }
]
var arr3 = [
    { id: 1, name: '1', age: 1 },
    { id: 2, name: 2, age: 2 }
]
const res12 = compareData(arr1, arr2)
// const res13 = compareArray(arr1, arr3)
console.log({ res12 })
// console.log({ res13 })
