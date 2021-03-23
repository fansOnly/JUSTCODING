/**
 * bubbleSort - 冒泡排序
 * Sorts an array of numbers, use the bubble sort algorim.
 * 1. Declare variable, swapped, that indicates if any values were swapped during the current interation.
 * 2. Use the spread operator (...) to clone the original array arr.
 * 3. Use a for loop to iterate over the elements of the cloned array, terminating before the last element.
 * 4. Use a nested for loop to iterate over e segment of the array between 0 and i, swapping any adjacent out of order elements and setting swapped to true.
 * 5. If swapped is false after an iteration, no more changes are needed, so the cloned array is returned.
 */
const bubbleSort = arr => {
    let swapped = false
    const a = [...arr]
    for (let i = 1; i < a.length - 1; i++) {
        swapped = false
        for (let j = 0; j < a.length - 1; j++) {
            if (a[j+1] < a[j]) {
                [a[j+1], a[j]] = [a[j], a[j+1]];
                swapped = true
            }
        }
        if (!swapped) return a
    }
    return a
}
const res = bubbleSort([2, 1, 4, 3])
console.log('res: ', res); // [ 1, 2, 3, 4 ]
