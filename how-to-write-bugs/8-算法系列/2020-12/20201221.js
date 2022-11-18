// 插入排序
function sortx(arr) {
    for (let i in arr) {
        while (i > 0 && arr[i] < arr[i-1]) {
            [arr[i], arr[i-1]] = [arr[i-1], arr[i]]
            i--
        }
    }
    return arr
}
const arr00 = [1,4,8,3,2,7,0]

console.log(sortx(arr00)) // [ 0, 1, 2, 3, 3, 4, 7, 8 ]


// 归并排序
function sortx2(arr) {
    if (arr.length <= 1) return arr
    const mid = ~~(Math.floor(arr.length / 2))
    let [left, right] = [sortx(arr.slice(0, mid)), sortx(arr.slice(mid))]
    
    let result = []
    while(left.length && right.length) {
        result.push((left[0] < right[0] ? left : right).shift())
    }
    return [...left, ...result, ...right]
}

console.log(sortx2(arr00)) // [ 0, 1, 2, 3, 3, 4, 7, 8 ]


// 快速排序
function sortx3(arr) {
    if (arr.length <= 1) return arr
    const mid = arr.length >> 1
    const midVal = arr[mid]
    let left = [], right = []
    arr.forEach(v => v < midVal ? left.push(v) : right.push(v))
    return [...left, mid, ...right]
}

console.log(sortx3(arr00)) // [ 0, 1, 2, 3, 3, 4, 7, 8 ]


// 二分查找
function findx(arr, target) {
    let left = 0, right = arr.length - 1
    while (left < right) {
        const mid = (left + right) >> 1
        const midVal = arr[mid]
        if (target === midVal) {
            return mid
        } else if (target > midVal) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}

console.log(findx(arr00, 7)) // 5
