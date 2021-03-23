/**
 * 数组去重
 * 一、嵌套 for 循环
 */
function unique(arr) {
    const result = arr.slice(0, 1)
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = result.length; j < len; j++) {
            if (arr[i] === result[j]) break
            if (j === len - 1) result.push(arr[i])
        }
    }
    return result
}

const arr = [ 1, 2, 3, 4, 5, 5, 6, 7, 4, 8, 2, 9 ]

console.log(unique(arr))


/**
 * 二、indexOf
 */
function unique2(arr) {
    const result = []
    for (let i = 0; i < arr.length; i++) {
        const value = arr[i]
        if (result.indexOf(value) === -1) result.push(arr[i])
    }
    return result
}

console.log(unique2(arr))


/**
 * 三、排序后去重
 */
function unique3(arr) {
    arr = arr.sort((a, b) => a - b)
    const result = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            result.push(arr[i])
        }
    }
    return result
}

console.log(unique3(arr))


/**
 * 四、Set
 */
function unique4(arr) {
    return [...new Set(arr)]
}

console.log(unique4(arr))
