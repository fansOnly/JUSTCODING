// 1 给定一个整数数组，找到从三个整数中产生的最大乘积

function computeProduct(unsorted) {
    const sortedArray = unsorted.sort((a, b) => a - b);
    const array_n_element = sortedArray.length - 1;

    let product1 = product2 = 1;

    // 取数组最大的三个数乘积
    for (let x = array_n_element; x > array_n_element - 3; x--) {
        product1 = product1 * sortedArray[x];
    }

    product2 = sortedArray[0] * sortedArray[1] * sortedArray[array_n_element];
    if (product1 > product2) return product1;

    return product2;
}

const arr00 = [-10, 5, 3, 1, 1, 3, 5, 10]
console.log(computeProduct(arr00))


// 2 一个未排序的数组包含 n 个连续数字中的（n-1）个数字，找到缺失的数字，要求时间复杂度为 O(n)
const findMissingNumber = (arr, start, end) => {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    const sumMin = (start * (start - 1)) / 2
    const sumMax = (end * (end + 1)) / 2
    const sumAuto = sumMax - sumMin
    return sumAuto - sum
}

const arrayOfIntegers = [2, 5, 1, 4, 9, 6, 3, 7];
const upperBound = 9;
const lowerBound = 1;
console.log(findMissingNumber(arrayOfIntegers, lowerBound, upperBound)); // 8


// 3 给定一个整数数组，请找出两个元素之间的最大差，较小值的元素必须位于较大元素之前
const findLargestDifference = arr => {
    let min = arr[0]
    let maxDiff = 0
    let minIndex = 0, maxIndex = 0
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > min && (arr[i] - min > maxDiff)) {
            maxDiff = arr[i] - min
            maxIndex = i
            minIndex = arr.indexOf(min)
        } else if (arr[i] < min) {
            min = arr[i]
        }
    }
    if (maxDiff <= 0) return -1
    return [maxDiff, minIndex, maxIndex]
}

const array = [7, 8, 4, 9, 9, 15, 3, 1, 10];

console.log(findLargestDifference(array)) // [11, 2, 5]



// 4 给定一个整数数组，返回一个数组，其中 output [i] 等于自身以外的所有元素的乘积，要求时间复杂度为 O(n)
const productExceptSelf = arr => {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        const rest = arr.slice()
        rest.splice(i, 1)
        res[i] = rest.reduce((a, b) => a * b, 1)
    }
    return res
}

const productExceptSelf2 = arr => {
    let p1 = p2 = 1
    let len = arr.length
    let res = []
    for (let i = 0; i < len; i++) {
        res.push(p1)
        p1 *= arr[i]
    }
    for (let i = len - 1; i >= 0; i--) {
        res[i] *= p2
        p2 *= arr[i]
    }
    return res
}

const firstArray = [2, 2, 4, 1];
const secondArray = [0, 0, 0, 2];
const thirdArray = [-2, -2, -3, 2];
console.log(productExceptSelf(firstArray)) // [8, 8, 4, 16]
console.log(productExceptSelf2(firstArray)) // [8, 8, 4, 16]
console.log(productExceptSelf(secondArray)) // [0, 0, 0, 0]
console.log(productExceptSelf(thirdArray)) // [12, 12, 8, -12]
