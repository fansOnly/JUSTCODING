/**
 * insertionSort - 插入排序
 * Sorts an array of numbers, using the insertion sort algorithm.
 * 1. Use Array.prototype.reduce() to iterate over all the elements in the given array.
 * 2. If the length of the accumulator is 0, add the current element to it.
 * 3. Use Array.prototype.some() to iterate over the results in the accumulator util the correct position is found.
 * 4. Use Array.prototype.splice() to insert the current element into the accumulator.
 */
const insertionSort = arr => {
    return arr.reduce((acc, x) => {
        if (!acc.length) return [x]
        acc.some((y, i) => {
            if (x <= y) {
                acc.splice(i, 0, x)
                return true
            }
            if (x > y && i === acc.length - 1) {
                acc.splice(i + 1, 0, x)
                return false
            }
            return false
        })
        return acc
    }, [])
}

console.log(insertionSort([6, 3, 4, 1]))
