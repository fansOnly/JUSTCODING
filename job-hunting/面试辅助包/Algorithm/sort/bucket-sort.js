/**
 * bucketSort - 桶排序
 * Sorts an array of numbers, using the bucket sort algorithm.
 * 1. Use Math.min() and Math.max() and the spread operator to find the minimum and maximum values of the given array.
 * 2. Use Array.from() and Math.floor() to create the appropriate number of buckets (empty arrays).
 * 3. Use Array.prototype.forEach() to populate each bucket with the appropriate elements from the array.
 * 4. Use Array.prototype.reduce(), the spread operator and Array.prototype.sort() to sort each bucket and append it to the result.
 */
const bucketSort = (arr, size = 5) => {
    const min = Math.min(...arr)
    const max = Math.max(...arr)
    const buckets = Array.from(
        { length: Math.floor((max - min) / size) + 1 },
        () => []
    )
    arr.forEach(val => {
        buckets[Math.floor((val - min) / size)].push(val)
    })
    // console.log('buckets: ', buckets)
    return buckets.reduce((acc, val) => [...acc, ...val.sort((a, b) => a - b)], [])
}

console.time()
console.log(bucketSort([6, 3, 4, 1, 11, 33, 99, 55, 87, 100]))
console.timeEnd()
