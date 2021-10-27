/**
 * linearSearch
 * Finds the first index of a given element in an array using the linear search algorithm.
 * 1. Use the for...in loop to iterate over the indexes of the given array.
 * 2. Check if the element in the corresponding index is equal to item.
 * 3. If the element is found, return the index, using the unary operator + to covert it from a string to a number.
 * 4. If the element is not found after iterating over the whole array, return -1.
 */
const linearSearch = (arr, item) => {
    for (let i in arr) {
        if (arr[i] === item) return +i
    }
    return -1
}

console.log(linearSearch([2, 9, 9], 9)) // 1

console.log(linearSearch([2, 9, 9], 7)) // -1
