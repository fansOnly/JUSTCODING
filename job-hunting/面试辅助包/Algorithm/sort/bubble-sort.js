/**
 * bubbleSort - 冒泡排序
 * 每一轮比较后，当前数组中最大的会被移到末尾
 * 最大比较轮数 i = arr.length - 1
 * 每一轮比较次数 j = arr.length - 1 - i (之前比较的每一轮都会确认一个最大数)
 * Sorts an array of numbers, use the bubble sort algorithm.
 * 1. Declare variable, swapped, that indicates if any values were swapped during the current iteration.
 * 2. Use the spread operator (...) to clone the original array arr.
 * 3. Use a for loop to iterate over the elements of the cloned array, terminating before the last element.
 * 4. Use a nested for loop to iterate over e segment of the array between 0 and i, swapping any adjacent out of order elements and setting swapped to true.
 * 5. If swapped is false after an iteration, no more changes are needed, so the cloned array is returned.
 */
const bubbleSort = arr => {
    let swapped = false
    const a = [...arr]
    for (let i = 0; i < a.length - 1; i++) {
        swapped = false
        for (let j = 0; j < a.length - 1 - i; j++) {
            if (a[j + 1] < a[j]) {
                [a[j + 1], a[j]] = [a[j], a[j + 1]]
                swapped = true
            }
        }
        if (!swapped) return a
    }
    return a
}
const res = bubbleSort([2, 1, 4, 3])
console.log('res: ', res) // [ 1, 2, 3, 4 ]
