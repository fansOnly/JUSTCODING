/**
 * 一、数组排序之冒泡排序
 * 依次比较每数组的每个元素，如果前面的元素比后面的元素大，则两个元素交换位置
 * 空间复杂度 O(1)
 * 时间复杂度 O(n^2)  => 通过设置flag降为 O(n)
 */
function bubbleSort(arr) {
    const len = arr.length
    let flag = false
    for (let i = len; i >= 2; i--) {
        flag = false
        for (let j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                flag = true
            }
        }
        if (!flag) return arr
    }
    return arr
}

const arr = [ 10, 1, 5, 9, 2, 90, 23, 187, 3 ]

console.log(bubbleSort(arr.slice()))


/**
 * 二、数组排序之选择排序
 * 遍历自身以后的元素，找到最小的元素与自己交换
 * 空间复杂度 O(1)
 * 时间复杂度 O(n^2)
 */
function selectionSort(arr) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = i; j < len; j++) {
            if (arr[j] < arr[i]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr
}

console.log(selectionSort(arr.slice()))

/**
 * 三、插入排序
 * 将元素插入到已排好的数组中
 * 空间复杂度 O(1)
 * 时间复杂度 O(n^2)
 */
function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j-1]) {
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
            } else {
                break
            }
        }
    }
    return arr
}

console.log(insertionSort(arr.slice()))


/**
 * 四、快速排序
 * 确定基准值 pivot，循环数组，小于基准值的放左边，大于基准值的放右边，递归两边的数组，最后在将数组拼接起来
 * 时间复杂度 O(n log n)
 * 空间复杂度 O(log n)
 */
function quickSort(arr) {
    const len = arr.length
    if (len < 2) return arr
    const pivotIdx = len >> 1, pivot = arr[pivotIdx]
    const left = [], right = []
    for (let i = 0; i < len; i++) {
        if (arr[i] < pivot || (arr[i] === pivot && i !== pivotIdx)) {
            left.push(arr[i])
        } else if (arr[i] > pivot) {
            right.push(arr[i])
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)]
}

console.log(quickSort(arr.slice()))


/**
 * 五、归并排序 - 分治策略
 * 根据基准值pivot，不断的将数组分割只最小单位，最后将数组有序的拼接起来
 * 时间复杂度 O(n log n)
 * 空间复杂度 O(n + log n)
 */
function mergeSort(arr) {
    if (arr.length < 2) return arr
    const pivotIdx = arr.length >> 1
    const left = mergeSort(arr.slice(0, pivotIdx))
    const right = mergeSort(arr.slice(pivotIdx))
    const result = []
    for (let i = 0; i < arr.length; i++) {
        if (!left.length) {
            result.push(right.shift())
        } else if (!right.length) {
            result.push(left.shift())
        } else {
            if (left[0] >= right[0]) {
                result.push(right.shift())
            } else {
                result.push(left.shift())
            }
        }
    }
    return result
}

console.log(mergeSort(arr))
