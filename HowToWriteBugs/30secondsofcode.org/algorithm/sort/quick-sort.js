/**
 * quickSort - 快速排序
 * Sorts an array of numbers, using the quick sort algorithm
 * 1. Use cursion.
 * 2. Use spread operator to clone the original array, arr.
 * 3. If the length of the array is less then 2, return the cloned array.
 * 4. Use Math.floor() to calculate the index of the pivot element.
 * 5. Use Array.prototype.reduce() and Array.prototype.push() to split the array into two subarrays (element smaller or equal to the pivot, elelments greater than it), destructuring the result into two arrays.
 * 6. Recursively call quickSort() on the created subarrays.
 */
const quickSort = arr => {
    const a = [...arr]
    if (a.length < 2) return a
    const pivotIndex = Math.floor(arr.length / 2)
    const pivot = a[pivotIndex]
    const [left, right] = a.reduce((acc, val, i) => {
        if (val < pivot || (val === pivot && i !== pivotIndex)) {
            acc[0].push(val)
        } else if (val > pivot) {
            acc[1].push(val)
        }
        return acc
    }, [[], []])
    return [...quickSort(left), pivot, ...quickSort(right)]
}

console.log(quickSort([1, 6, 1, 5, 3, 2, 1, 4]))
