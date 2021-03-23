/**
 * Find the index of a given element in a sorted array using the binary search algorithm.
 * 1. Declare the left and right boundaries, l and r, initialized to 0 and the length of the array respectively.
 * 2. Use a while loop to repeatedly narrow down the search subarray, using Math.floor() to cut it in half.
 * 3. Return the index of element if found, otherwiose return -1.
 * Note: does not account for duplicate values in the array.
 */
const binarySearch = (arr, item) => {
    let l = 0, r = arr.length - 1
    while (l <= r) {
        const mid = (l + r) >> 1
        const val = arr[mid]
        if (val === item) return mid
        if (val > item) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return -1
}

console.log(1)

console.log(binarySearch([1, 2, 3, 4, 5], 1)); // 0
console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5], 6)); 
