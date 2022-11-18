// 二分查找
// 画图标注解析

/**
 * 1 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置
 */
const getOrInset = (arr, target) => {
    let left = 0, right = arr.length - 1
    while (left <= right) {
        const mid = left + ((right - left) >> 1)
        if (target == arr[mid]) {
            return mid
        } else if (target > arr[mid]) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return left
}

const arr00 = [1,3,5,6,10]
const target = 9
console.log(getOrInset(arr00, target)) // 4



/**
 * 2 给定一个按照升序排列的整数数组 nums，和一个目标值 target。
 * 找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 */
const getPos = (arr, target) => {
    const lowerBound = (arr, target) => {
        let left = 0, right = arr.length - 1
        while (left <= right) {
            const mid = left + ((right - left) >> 1)
            if (target > arr[mid]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return left
    }
    const upperBound = (arr, target) => {
        let left = 0, right = arr.length - 1
        while (left <= right) {
            const mid = left + ((right - left) >> 1)
            if (target >= arr[mid]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return right
    }
    const lower = lowerBound(arr, target), upper = upperBound(arr, target)
    if (upper < lower) return [-1, -1]
    return [lower, upper]
}

const arr02 = [5,7,7,8,8,10], target2 = 8
console.log(getPos(arr02, target2)) // [3, 4]


/**
 * 3 如何从数组或区间中找出第一个大于或最后一个小于目标元素的数的索引
 */
const getIndex = (arr, target) => {
    let left = 0, right = arr.length - 1
    while (left <= right) {
        const mid = left + ((right - left) >> 1)
        if (target >= arr[mid]) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return left
}

const arr03 = [1,3,5,5,6,6,8,9,11], target3 = 6
console.log(getIndex(arr03, target3)) // 
